'use strict'

const Controller = require("egg").Controller;
const constant = require('../../constant');
const ComponentService = require('../../service/ComponentService');
const VersionService = require('../../service/VersionService');
const ComponentTask = require('../../models/ComponentTask');
const { failed, success } = require('../../utils/request')
const axios = require('axios')
const { decode } = require('js-base64');
const { formatName } = require('../../utils/index')
class ComponentsController extends Controller {

    // api/v1/components
    async index() {
        const { ctx, app } = this;
        const { name } = ctx.query;
        const andWhere = name ? `AND c.name LIKE '%${name}%'` : '';
        const sql = `SELECT c.id, c.name, c.classname, c.description, c.npm_name, c.npm_version, c.git_type, c.git_remote, c.git_owner, c.git_login, c.create_dt, c.update_dt, v.version, v.build_path, v.example_path, v.example_list
    FROM component AS c
    LEFT JOIN version AS v ON c.id = v.component_id
    WHERE c.status = 1 AND v.status = 1 ${andWhere}
    ORDER BY c.create_dt, v.version DESC`;
        const result = await app.mysql.query(sql);
        const components = [];
        result.forEach(component => {
            let hasComponent = components.find(item => item.id === component.id);
            if (!hasComponent) {
                hasComponent = {
                    ...component,
                };
                delete hasComponent.version;
                delete hasComponent.build_path;
                delete hasComponent.example_path;
                delete hasComponent.example_list;
                hasComponent.versions = [];
                components.push(hasComponent);
                hasComponent.versions.push({
                    version: component.version,
                    build_path: component.build_path,
                    example_path: component.example_path,
                    example_list: component.example_list,
                });
            } else {
                hasComponent.versions.push({
                    version: component.version,
                    build_path: component.build_path,
                    example_path: component.example_path,
                    example_list: component.example_list,
                });
            }
        });
        ctx.body = components;
    }

    // api/v1/components/:id
    async show() {
        const { ctx, app } = this;
        const id = ctx.params.id
        const results = await app.mysql.select('component', {
            where: { id }
        })
        if (results && results.length > 0) {
            const component = results[0]
            component.versions = await app.mysql.select('version', {
                where: { component_id: id },
                orders: [['version', 'desc']]
            })
            // gitee GET https://gitee.com/api/v5/repos/{owner}/{repo}/contents(/{path})
            // git GET https://api.github.com/repos/{owner}/{repo}/{path})
            let readmeUrl;
            const name = formatName(component.classname);
            if (component.git_type === 'gitee') {
                readmeUrl = `https://gitee.com/api/v5/repos/${component.git_login}/${name}/contents/README.md`
            } else {
                readmeUrl = `https://api.github.com/repos/${component.git_login}/${name}/README.md`
            }
            const readme = await axios.get(readmeUrl);
            let content = readme.data && readme.data.content;
            if (content) {
                content = decode(content)
                if (content) {
                    component.readme = content
                }
            }
            ctx.body = component
        } else {
            ctx.body = {}
        }
    }

    // post data
    async create() {
        const { ctx, app } = this;
        const { component, git } = ctx.request.body;
        const timestamp = new Date().getTime()
        // 1. 添加组件信息
        const componentData = {
            name: component.name,
            classname: component.className,
            description: component.description,
            npm_name: component.npmName,
            npm_version: component.npmVersion,
            git_type: git.type,
            git_remote: git.remote,
            git_owner: git.owner,
            git_login: git.login,
            status: constant.STATUS.ON,
            create_dt: timestamp,
            create_by: git.login,
            update_dt: timestamp,
            update_by: git.login,
        };
        const componentService = new ComponentService(app);
        const haveComponentInDB = await componentService.queryOne({
            className: component.className
        })
        let componentId;
        if (!haveComponentInDB) {
            componentId = await componentService.insert(componentData);
        } else {
            componentId = haveComponentInDB.id
        }
        if (!componentId) {
            ctx.body = failed('添加组件失败')
        }
        // 2.添加组件版本信息
        const versionData = {
            component_id: componentId,
            version: git.version,
            build_path: component.buildPath,
            example_path: component.examplePath,
            example_list: JSON.stringify(component.exampleList),
            status: constant.STATUS.ON,
            create_dt: timestamp,
            create_by: git.login,
            update_dt: timestamp,
            update_by: git.login,
        }
        const versionService = new VersionService(app);
        const haveVersionInDB = await versionService.queryOne({
            component_id: componentId,
            version: git.version
        });
        if (!haveVersionInDB) {
            const versionRes = await versionService.insert(versionData)
            if (!versionRes) {
                ctx.body = failed('添加组件失败')
            }
        } else {
            const updateData = {
                build_path: component.buildPath,
                example_path: component.examplePath,
                example_list: JSON.stringify(component.exampleList),
                update_dt: timestamp,
                update_by: git.login,
            };
            const versionRes = await versionService.update(updateData, {
                component_id: componentId,
                version: versionData.version,
            });
            if (!versionRes) {
                ctx.body = failed('更新组件失败');
                return;
            }
        }
        //3.向OSS中上传组件预览文件
        console.log('向OSS中上传组件预览')
        const task = new ComponentTask({
            repo: git.remote,
            version: git.version,
            name: component.className,
            branch: git.branch,
            buildPath: component.buildPath,
            examplePath: component.examplePath,
        }, { ctx });
        try {
            // 3.1 下载源码
            await task.downloadSourceCode();
            // 3.2 上传组件构建结果
            await task.publishBuild();
            // 3.3 上传组件多预览文件
            await task.publishExample();
            ctx.body = success('添加组件成功', {
                component: await componentService.queryOne({ id: componentId }),
                version: await versionService.queryOne({ component_id: componentId, version: git.version })
            })
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = failed('添加组件失败，失败原因：' + e.message);
        }
    }
}

module.exports = ComponentsController
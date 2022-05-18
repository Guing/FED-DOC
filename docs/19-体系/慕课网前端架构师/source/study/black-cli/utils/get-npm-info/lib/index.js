'use strict';


module.exports = {
    getNewVersion,
    getDefaultRegistry,
    getLatestVersion
};
const axios = require('axios')
const urlJoin = require('url-join')
const log = require('@black-cli/log')
const semver = require('semver')
async function getNewVersion(npmName, currentVersion,) {
    if (!npmName) {
        return null;
    }
    let registry = getDefaultRegistry(false)
    const url = urlJoin(registry, npmName)
    try {
        const res = await axios.get(url)
        if (res.status == 200) {
            const data = res.data;
            let updateVersions = [];
            if (currentVersion) {
                updateVersions = Object.keys(data.versions).filter(version => semver.satisfies(version, `>=${currentVersion}`))
                    .sort((a, b) => semver.gt(a, b) ? -1 : 1)
            } else {
                updateVersions = Object.keys(data.versions).sort((a, b) => semver.gt(a, b) ? -1 : 1)
            }
            if (updateVersions && updateVersions.length > 0) {
                return updateVersions[0]
            }
        }
    } catch (e) {
        log.error('HTTP',`请求${npmName}包信息失败。${e.message}`)
    }

    return null;
}
function getDefaultRegistry(isOrigin) {
    return isOrigin ? 'https://registry.npmjs.com/' : 'https://registry.npm.taobao.org'
}
async function getLatestVersion(npmName) {

    return await getNewVersion(npmName);
}
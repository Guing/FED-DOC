'use strict';

const { createCloudBuildTask } = require('../../models/CloudBuildTask')
const { FAILED } = require('../../constant')

module.exports = app => {
  class Controller extends app.Controller {
    async index() {
      //创建云构建任务
      const { ctx, app } = this
      const { socket, helper } = ctx
      const cloudBuildTask = await createCloudBuildTask(ctx, app)
      try {
        await prepare(cloudBuildTask, socket, helper)
        await download(cloudBuildTask, socket, helper)
        await install(cloudBuildTask, socket, helper)
        await build(cloudBuildTask, socket, helper)
        await prePublish(cloudBuildTask, socket, helper)
        await publish(cloudBuildTask, socket, helper)
        socket.emit('build', helper.parseMsg('build success', {
          message: `云构建成功，访问链接：https://${cloudBuildTask._prod ? 'cloudscope-cli' : 'cloudscope-cli-dev'}.liugezhou.online/${cloudBuildTask._name}/index.html`
        }))
        socket.disconnect()
      } catch (e) {
        socket.emit('build', helper.parseMsg('error', {
          message: `云构建失败，捕获失败原因${e.message}`
        }))
        socket.disconnect()
      }
    }
  }
  return Controller;
};


async function prepare(cloudBuildTask, socket, helper) {
  socket.emit('build', helper.parseMsg('prepare', {
    message: '开始执行构建前的准备工作'
  }))
  const prepareRes = await cloudBuildTask.prepare()
  if (!prepareRes || Object.is(prepareRes.code, FAILED)) {
    const msg = prepareRes ? prepareRes.message : '无'
    socket.emit('build', helper.parseMsg('prepare failed', {
      message: `执行云构建准备工作失败，失败原因：${msg}`
    }))
    return
  }
  socket.emit('build', helper.parseMsg('prepare', {
    message: '构建前准备工作成功'
  }))
}
async function download(cloudBuildTask, socket, helper) {
  socket.emit('build', helper.parseMsg('download repo', {
    message: '开始下载源码'
  }))
  const downloadRes = await cloudBuildTask.download()
  if (!downloadRes || Object.is(downloadRes.code, FAILED)) { //  downlod下载失败
    socket.emit('build', helper.parseMsg('download failed', {
      message: '源码下载失败'
    }))
    return
  } else {
    socket.emit('build', helper.parseMsg('download repo', {
      message: '源码下载成功'
    }))
  }
}
async function install(cloudBuildTask, socket, helper) {
  socket.emit('build', helper.parseMsg('install', {
    message: '开始安装依赖'
  }))
  const installRes = await cloudBuildTask.install()
  if (!installRes || Object.is(installRes.code, FAILED)) { //  downlod下载失败
    socket.emit('build', helper.parseMsg('install failed', {
      message: '安装依赖失败'
    }))
    return
  } else {
    socket.emit('build', helper.parseMsg('install', {
      message: '安装依赖成功'
    }))
  }
}
async function build(cloudBuildTask, socket, helper) {
  socket.emit('build', helper.parseMsg('build', {
    message: '开始启动云构建'
  }))
  const buildRes = await cloudBuildTask.build()
  if (!buildRes || Object.is(buildRes.code, FAILED)) { //  downlod下载失败
    socket.emit('build', helper.parseMsg('build failed', {
      message: '云构建任务执行失败'
    }))
    return
  } else {
    socket.emit('build', helper.parseMsg('build', {
      message: '云构建任务执行成功'
    }))
  }
}
async function prePublish(cloudBuildTask, socket, helper) {
  socket.emit('build', helper.parseMsg('pre-publish', {
    message: '开始发布前检查'
  }))
  const prePublishRes = await cloudBuildTask.prePublish()
  if (!prePublishRes || Object.is(prePublishRes.code, FAILED)) {
    socket.emit('build', helper.parseMsg('pre-publish failed', {
      message: '发布前检查失败,失败原因：' + (prePublishRes && prePublishRes.message ? prePublishRes.message : '未知')
    }))
    throw new Error('发布终止')
  } else {
    socket.emit('build', helper.parseMsg('pre-publish', {
      message: '发布前检查通过'
    }))
  }
}
async function publish(cloudBuildTask, socket, helper) {
  socket.emit('build', helper.parseMsg('publish', {
    message: '开始发布'
  }))
  const publishRes = await cloudBuildTask.publish()
  if (!publishRes || Object.is(publishRes.code, FAILED)) { //  downlod下载失败
    socket.emit('build', helper.parseMsg('publish failed', {
      message: '发布失败'
    }))
    return
  } else {
    socket.emit('build', helper.parseMsg('publish', {
      message: '发布成功'
    }))
  }
}

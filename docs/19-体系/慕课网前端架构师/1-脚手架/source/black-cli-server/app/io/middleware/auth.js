'use strict';

const { createCloudBuildTask } = require('../../models/CloudBuildTask')
const REDIS_PREFIX = 'cloudbuild'
module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger, helper } = ctx
    const { id } = socket
    const { redis } = app
    const query = socket.handshake.query
    try {
      socket.emit(id, helper.parseMsg('connect', {
        type: 'connect',
        message: '云构建服务连接成功'
      }))
      // 判断redis任务是否存在
      let hashTask = await redis.get(`${REDIS_PREFIX}:${id}`)
      if (!hashTask) {
        await redis.set(`${REDIS_PREFIX}:${id}`, JSON.stringify(query))
      }
      hashTask = await redis.get(`${REDIS_PREFIX}:${id}`)
      await next();
      //清除缓存文件
      const cloudBuildTask = await createCloudBuildTask(ctx, app)
      await cloudBuildTask.clean()
      console.log('disconnect!');
    } catch (error) {
      logger.info('build error', error.message)
      //清除缓存文件
      const cloudBuildTask = await createCloudBuildTask(ctx, app)
      await cloudBuildTask.clean()
    }

  };
};
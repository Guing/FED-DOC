'use strict';
const AliOSS = require('ali-oss');
const config = require('../../config/db')
class OSS {
  constructor(bucket) {
    this.oss = new AliOSS({
      region: config.OSS_REGION,
      accessKeyId: config.OSS_ACCESS_KEY,
      accessKeySecret: config.OSS_ACCESS_SECRET_KEY,
      bucket,
    })
  }

  async list(prefix) {
    const ossFileList = await this.oss.list({
      prefix,
    });
    if (ossFileList && ossFileList.objects) {
      return ossFileList.objects;
    }
    return [];
  }

  async put(object, localPath, options = {}) {
    await this.oss.put(object, localPath, options);
  }
}

module.exports = OSS
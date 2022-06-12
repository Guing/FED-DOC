'use strict';
const semver = require('semver')
const log = require('@black-cli/log');
const LOW_NODE_VERSION = '10.0.0'
class Command {
   constructor(argv) {
      this._argv = argv;
      let runner = new Promise((resolve, reject) => {
         let chain = Promise.resolve()
         chain.then(() => {
            this.checkNodeVersion()
         }).then(() => {
            this.initArgv();
         }).then(() => {
            this.init();
         }).then(() => {
            this.exec();
         })
         chain.catch(err => {
            log.error(err.message)
         })
      })
   }
   initArgv() {
      this._cmd = this._argv[this._argv.length - 1];
      this._projectName = this._argv[0] || '';
      this._options = this._argv[1];
   }
   checkNodeVersion() {
      if (semver.gt(LOW_NODE_VERSION, process.version)) {
         throw new Error(`支持的最低Node版本为v${LOW_NODE_VERSION}`);
      }

   }
   init() {
      log.error('init方法必须实现')
   }
   exec() {
      log.error('exec方法必须实现')
   }
}


module.exports = Command;

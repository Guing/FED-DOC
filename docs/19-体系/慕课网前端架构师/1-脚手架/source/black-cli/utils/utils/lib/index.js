'use strict';

const fs = require('fs')

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]'
}
function spinnerStart(msg, spinnerText = '|/-\\') {
    const Spinner = require('cli-spinner').Spinner;

    const spinner = new Spinner(msg + '%s');
    spinner.setSpinnerString(spinnerText);
    spinner.start();
    return spinner

}
async function sleep(time = 1000) {
    await new Promise((resolve) => { setTimeout(() => { resolve() }, time) })
}

//win平台使用cmd执行
function exec(command, args, options) {
    const win32 = process.platform === 'win32';
    const cmd = win32 ? 'cmd' : command;
    const cmdArgs = win32 ? ['/c'].concat(command, args) : args
    return  require('child_process').spawn(cmd, cmdArgs, options || {});
}
 async function execSync(command, args, options){
    return new Promise((resolve,reject)=>{
        const childProcess = exec(command, args, options)
        childProcess.on('error',(e)=>{
            reject(e)
        })
        childProcess.on('exit',(data)=>{
            resolve(data)
        })
    })
}

function readFile(path,options={}){
    if(fs.existsSync(path)){
      const buffer = fs.readFileSync(path);
      if(buffer){
        if(options.toJson){
          return buffer.toJSON()
        }else{
          return buffer.toString()
        }
      }
    }
    return null
  }
  
  function writeFile(path,data,{rewrite = true}={}){
    if(fs.existsSync(path)){
      if(rewrite){
        fs.writeFileSync(path,data)
        return true
      }
      return false
    }else{
      fs.writeFileSync(path,data)
        return true
    }
  }
  
module.exports = {
    isObject,
    spinnerStart,
    sleep,
    exec,
    execSync,
    readFile,
    writeFile
};


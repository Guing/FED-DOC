#  通过脚手架命令Command类封装



# 2. 利用Node多进程动态执行命令（stdio的inherit属性讲解）

我们回到exec/lib/index.js中，其中之前的那行代码 require(rootFile).call(null,Array.from(**arguments**)); 是在当前进程中调用的，我们需要修改为在node进程中进行调用，这便是本节的重点。

我们通过本周第五章的内容，已经知道了如何使用child_process下的同步或者异步方法进行子进程的执行，这里我有两种方法可以使用

```javascript
const cp = require('child_process')
// cp.fork()  //这里因为fork没有回调，需要通过通信的方式来获取结果，所以这里不推荐

 //之所以不用spawnSync是因为，我们在执行这里的时候是需要不断的用户交互的，需要不断的收到数据打印结果，不要一次性
const child = cp.spawn('node',['-e',code],{
    cwd:process.cwd(),
  stdio:'inherit'   // 加入这行代码，下面的就可以注释掉了
}) 
// child.stdout.on('data',(chunk =>{
// }))
// child.stderr.on('data',(chunk =>{
// }))

// 当然存在错误的情况，我们还是需要添加两个监听事件
child.on('error', e =>{
  log.error(e.message);
  process.exit(1);
})
child.on('exit', e=>{
  log.verbose('命令执行成功' + e);
  process.exit(e);
})
```

spawn方法中的参数stdio默认值为'pipe'管道，pipe使得主进程与子进程会产生通信通道，因此需要通过on这种方式去进行监听。 stdio还有一个值为'inherit'，它将相应的stdio传给父进程或者从父进程传入。也就是说：直接将process.stdin、process.stdout、process.stderr直接和父进程进行绑定，这样就无须去监听结果，可以直接将结果打印出来。

# 3. 生成Node多进程动态执行代码

通过上一节的学习，我们通过代码const args = Array.from(**arguments**)
const cmd = args[args.length - 1]可以知道，现在需要做的就是拼成上面spawn在执行时所需的code 我们之前的代码为 _require(rootFile).call(null,Array.from(arguments));
也就是兼容 conse code = require(rootFile).call(null,Array.from(arguments));
rootfile -> ${rootfile},难点是 Array.from(arguments)的传入。

```javascript
onst args = Array.from(arguments)
const cmd = args[args.length - 1]   // 拿到command，且进行瘦身，对不需要的参数进行过滤
const o = Object.create(null)
Object.keys(cmd).forEach(key=>{
    if(cmd.hasOwnProperty(key) && !key.startsWith('_')&& key!=='parent'){
     o[key]=cmd[key]
  }
})
args[args.length-1] = o
const code = `require('${rootFile}').call(null,${JSON.stringify(args)})`
```

注：由于我使用的commander是7.0.0的，低于此版本传入的参数为两个，但7.0.0版本传入参数为3个，因此上面的代码，我这里直接写成(不知道后续是否还会有错误)：

```javascript
let args = Array.from(arguments).splice(0,2)
const code = `require('${rootFile}').call(null,${JSON.stringify(args)})`
```

到这里，使用node多进程执行代码的功能就完成了。

# 4. windows操作系统spawn执行命令兼容

windows操作系统与macOS关于spawn的执行是不一样的，本节解决的就是windows操作系统下的兼容 将本方法封装在utils/utils包中：通过process.platform来判断操作系统

```javascript
function exec(command,args,options){
  const win32 = process.platform === 'win32';
  const cmd = win32 ? 'cmd': command
  const cmdArgs = win32  ?  ['/c'].concat(command,args) : args;
  return require('child_process').spawn(cmd, cmdArgs,options || {})
}
```

到以上为止，我们完成了动态命令的加载和执行。



若有收获，就点个赞吧
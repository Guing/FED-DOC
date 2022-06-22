## NPM包

### editor-server

- formidable
	- 一个用于解析表单数据的 Node.js 模块，尤其是文件上传
- release-it （26周3-4）
  - 一个版本发布管理工具，可以自动生成Changelog日志，规范发布tag等
- helmet (27周2-4)
  - 一个优化http请求头库，可以帮忙网站更加安全

- csurf(27周2-4)
  - 防止跨站脚本工具

- escape-html(27周2-4)
  - 格式化html字符串，可以防止xss攻击

- nodemailer（27周3-4）
  - 发送邮件库



### editor

- array-move      （18周4-3）
  - 移动数组元素到不同的位置
  
- vue Draggale  （18周4-5）
  - 一个Vue的拖拉组件
  
- CropperJs     （18周2-2）
  - 一个图片裁剪库
  
- hotkey.js (19周4-2)
  - 一个快捷键的库
  
- json server （20周3-1）
  - 一个数据mock工具
  
- async-validator (20周4-1)
  - 一个异步检验库
  
- path-to-regexp （20周6-1）

  - 将url路径和正则表达式互相转化的库，

  - ```javascript
    const keys = [];
    const regexp = pathToRegexp("/foo/:bar", keys);
    // regexp = /^\/foo(?:\/([^\/#\?]+?))[\/#\?]?$/i
    // keys = [{ name: 'bar', prefix: '/', suffix: '', pattern: '[^\\/#\\?]+?', modifier: '' }]
    
    const fn = match("/user/:id", { decode: decodeURIComponent });
    fn("/user/123"); //=> { path: '/user/123', index: 0, params: { id: '123' } }
    fn("/invalid"); //=> false
    fn("/user/caf%C3%A9"); //=> { path: '/user/caf%C3%A9', index: 0, params: { id: 'café' } }
    
    const tokens = parse("/route/:foo/(.*)");
    console.log(tokens[0]);
    //=> "/route"
    
    const toPath = compile("/user/:id", { encode: encodeURIComponent });
    toPath({ id: 123 }); //=> "/user/123"
    toPath({ id: "café" }); //=> "/user/caf%C3%A9"
    toPath({ id: "/" }); //=> "/user/%2F"
    ```

- html2canvas (21周2-1)

  - 将html的dom转化为canvas
  
- node-qrcode(21周4-2)

  - 生成二维码

- clipboard.js （21周5-1）

  - 拷贝文本数据

- FileSaver.js (21周7-3)
  - 浏览器文件下载库
  
- cross-env (22周2-3)

  - 跨平台设置环境变量

## event-analytics-server

- node-cron (24周3-4)
  - node执行定时任务


## 工具

https://regexr.com/ 一个非常强大的正则在线工具
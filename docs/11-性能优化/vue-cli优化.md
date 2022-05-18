## vue-cli 已经默认做了的优化

* cache-loader 会默认为 Vue/Babel/TypeScript 编译开启。文件会缓存在 node_modules/.cache 中
* 图片等多媒体文件使用url-loader，小于4K的图片会转base64编码内联在js文件中
* 生产环境下使用mini-css-extract-plugin，将css提取成单独的文件
* thread-loader 会在多核 CPU 的机器上为 Babel/TypeScript 转译开启并行处理。
* 提取公共代码：两个缓存组chunk-vendors和chunk-common
* 代码压缩(terser-webpack-plugin)
* preload-webpack-plugin：所有入口js、css文件加上preload，按需加载文件加上prefetch

## 检查项目中哪些地方还有优化空间

### 静态资源

* 图片：头像、封面还有压缩空间，现在平均100K左右，大的超过1M
* js、css：首屏加载的几个主要的加起来有几M，可以分割代码减少加载量
* other：prefetch的文件过多，占用过多服务器带宽

### 其它

* 有些地方可以加缓存，减少ajax请求量，可以考虑用什么形式（session storage、cache storage、index db、http 缓存）
* 部分页面可以考虑文档结构在服务端渲染
* 有些地方有不必要的重绘

### 可能有效的方法

* 响应式图片：picture 元素
* Intersection Observer 懒加载
* Critical 异步加载 css
* dns-prefetch、preconnect、prefetch、prerender、preload
* Tree-shaking、Scope hoisting
* webpack分片调整
* 代码最小化(进一步压缩)
* 动态import实现路由懒加载
* 图片压缩

## 优化

### 分片优化
- node_modules 中的文件还是打包进 chunk-vendors，被引用得太多，已经难以改成按需加载，而且变动频率低，可以作为浏览器缓存（304）长期不失效。
- 被引用少且体量大的文件单独分一个chunk。
- 其它公共代码分成多个chunk，这样可以避免从某个入口访问时下载全部公共代码，以及部分代码变动时不会导致全部公共代码的缓存失效。
- 体量很小的异步chunk合并进其它相关异步chunk中，或者合并进入口chunk。

### 路由懒加载

入口chunk太大，看了一下路由有很多都是静态import。改了一波入口动态import，只保留常用的几个路由是静态的。
把大的入口chunk分割成小chunk的好处：减少用户首次访问时需要下载的文件大小，以及执行的代码量。减少不同入口间的重复代码。
坏处：用户后续操作可能就得再下载新文件，增加等待时间。异步chunk可能会依赖一些该入口chunk中就有的文件，导致下载重复代码。
根据路由划分，符合上述规则的每个路由一个chunck，其余保留直接静态import，或者合并进其它chunk（同名chunk会合并）

### 使用频率低的库单独分一片

### 平时的代码写法建议
新增的路由，考虑下要不要懒加载，看下有没有已有的chunk是同样的文件，要不要并入已有的 chunk，要不要 prefetch。
tabs 考虑下要不要懒加载（切换到对应tab时再渲染）
比较大的依赖最好按需加载（加loading动画）
项目内的图片的分辨率应该考虑使用场景的尺寸
用户上传的图片可以考虑下要不要压缩
新开选项卡会导致大量 js 再执行一遍，尽量思考一下是否有必要
依赖库最好不要频繁变更，变更尽量集中在一起统一上线

- 调用webpack函数，传config配置对象
- 返回一个complier对象。complier类里会有一个hooks属性，通过tabable包注册所有的插件。
- 然后创建一个compilation，开始处理模块相关的东西。
  - addEntry进行模块入口
  - facModule分解模块，查看模块依赖。
  - addModule将模块添加到模块队列里面。
  - needBuild判断模块是否构建了。
  - buildModule如果模块没有构建就开始构建模块。
  - _build->module.build->this._doBuild真正调用build的方法。
  - runLoader调用传的loader，本质是使用loader-runner这个包
  - 所有操作完成，就成一个模块的图结构
  - 使用seal方法，冻结真个模块对象，防止修改。
  - 查看要输出哪些文件
- 调用onCompiled回调
- 调用this.emitAssets输出结果，创建文件夹，写入文件。

- **complier与compilation的区别**

- 在Webpack中，`compiler`和`compilation`是两个核心的概念，它们代表着不同的实体和角色。

  1. Compiler: `Compiler`是Webpack的核心实例，它代表着整个Webpack编译器。当你运行Webpack时，它会创建一个`compiler`对象，负责管理整个构建过程。`compiler`负责解析配置文件、加载插件、执行构建流程等。它是Webpack构建过程的主要控制者。一次构建只有一个`compiler`实例。

  `compiler`主要的作用包括：

  - 读取和解析配置文件，得到Webpack配置。
  - 加载所有配置中指定的插件，包括内置插件和用户自定义插件。
  - 创建`compilation`对象并驱动编译过程。
  - 生成和更新Webpack构建产物。

  1. Compilation: `Compilation`是Webpack在每次构建过程中的一个编译实例。每当Webpack运行时，都会创建一个新的`compilation`对象。它代表了当前一次构建过程中的所有资源、模块依赖、编译生成的文件等。

  `compilation`对象包含了当前构建过程中的所有信息，比如构建生成的代码、编译过程中的警告和错误、模块之间的依赖关系等等。在每次构建过程中，Webpack会对每个入口文件创建一个`compilation`对象，并通过`compiler`来管理和组织它们。

  `compilation`主要的作用包括：

  - 维护模块和资源之间的依赖关系图。
  - 将所有的模块转换成可执行的Javascript。
  - 通过插件系统扩展Webpack的功能，如添加新的资源、修改输出结果等。
  - 记录构建过程中的警告和错误信息。

  总结:

  - `compiler`是整个Webpack编译器的实例，代表了整个构建过程，负责驱动编译过程，是Webpack的控制中心。
  - `compilation`是每次构建过程中的一个实例，代表了当前一次构建过程中的所有资源和编译信息，是每次构建的数据集合。每次构建都会创建一个新的`compilation`对象，多次构建会有多个`compilation`对象。



![webpack整个执行流程解析](image/11_webpack%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/webpack%E6%95%B4%E4%B8%AA%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B%E8%A7%A3%E6%9E%90.png)
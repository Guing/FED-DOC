//compilerOptions 常用配置项

//文档查询网址 https://www.tslang.cn/docs/handbook/compiler-options.html 



//removeComments
//对编译出来的js文件是否显示注释（注解）


//strict
//代表我们的编译和书写规范，要按照TypeScript最严格的规范来写，如果我们把这个设置为false或者注释掉，意思是我们可以对设置一些不严格的写法。
//如果strict为true，则代表整块Type Checking的其他配置都默认为true。并且单独设置其他配置为false也不起效。要单独设置他配置则需要先把strict设置为false，或者注释掉。

//noImplicitAny
//noImplicitAny属性的作用是，允许你的注解类型 any 不用特意表明



//strictNullChecks
//不强制检查 NULL 类型
//比如：const jspang: string = null;


//outDir
//指定输出目录


//rootDir
//指源码目录

//allowJs
//typescript文件的后缀不一定是ts，可能是js，开启这个允许编译js文件


//sourceMap
//在打包的过程中就会给我们生成sourceMap文件


//noUnusedLocals
//没有使用的变量，在编译的时候会提示。


//noUnusedParameters
//没有使用的函数参数，在编译的时候会提示。
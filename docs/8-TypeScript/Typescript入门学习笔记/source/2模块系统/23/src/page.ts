// 用命名空间实现组件化



//将组件抽离到单独文件
namespace Home {
   
    //只暴露Page类
    export class Page {
        constructor() {
             new Components.Header();
             new Components.Content();
             new Components.Footer();
        }
    }
}

//编译的时候，会生成page.js,components.js两个文件,需要在index.html中引入components.js
//可以更改tsconfig.json中的配置，使生成一个文件
//outFile
//这个就是用来生成一个文件的设置，但是如果设置了它，就不再支持"module":"commonjs"设置了，我们需要把它改成"module":"amd"




//子命名空间
//在浏览器中也是可以查到这个命名空间的Components.SubComponents.Test
namespace Components {
    export namespace SubComponents {
      export class Test {}
    }
  
    //someting ...
  }

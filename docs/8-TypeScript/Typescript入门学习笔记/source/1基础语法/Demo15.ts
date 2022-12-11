//配置文件-初识 tsconfig.json


//tsconfig.json文件可以通过tsc --init命令生成的


//运行tsc demo15.ts，是不会读取tsconfig.json配置文件进行转义的。
//直接运行tsc，会读取tsconfig.json配置文件进行转义的。
let person11:string ='xiaohei';


//include 
//include属性是用来指定要编译的文件的
// {
//     "include":["demo.ts"],
//     "compilerOptions": {
//         //any something
//         //........
//     }
//   }


//exclude 配置
//exclude是不包含，除什么文件之外的才进行编译
// {
//     "exclude":["demo2.ts"],
//    "compilerOptions": {
//        //any something
//        //........
//    }
//  }


//files
//files的配置效果和include几乎一样

// {
//     "files":["demo.ts"],
//     "compilerOptions": {
//         //any something
//         //........
//     }
//   }
//声明ES6模块化的类型文件
declare module 'jquery'{
    interface JqueryInstance{
        html:(value:string)=>JqueryInstance
    }
    //混合类型
    declare function $(params:()=>void):JqueryInstance;
    declare function $(params:string):JqueryInstance;
    declare namespace ${
        namespace fn{
             class init{}
        }
    }
    //要通过export导出声明。
    export = $;
}
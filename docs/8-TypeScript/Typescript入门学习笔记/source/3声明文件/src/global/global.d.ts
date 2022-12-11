//对全局的变量进行类型声明，包括三种全局变量，全局函数，全局对象


//全局变量
// declare var $: () => void;


//全局函数
interface JqueryInstance {
    html: (value: string) => JqueryInstance
}
//通过函数重载，声明不同方法的调用
declare function $(params: () => void): JqueryInstance;
declare function $(params: string): JqueryInstance
//也可以通过接口的形式，进行函数重载
// interface Jquery{
//      (params:()=>void):JqueryInstance;
//      (params:string):JqueryInstance
// }
// declare var $:Jquery;



//全局对象
//全局对象，全局类的类型定义，以及命名空间的嵌套
declare namespace $ {
    namespace fn {
        class init { }
    }
}

//如果声明的类型只是函数类型，可以使用接口的形式。
//如果声明的类型既是函数类型，又是对象类型，就不能使用接口的形式重载，只能通过函数重载，加声明命名空间的方式。


declare let jQuery: (selector: string) => any;

//函数声明支持重载
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;


declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}


declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }

    type mySettings = AjaxSettings | undefined

    declare namespace jQuery {
        function ajax(url: string, settings?: mySettings): void;
    }
}

export default Directions;

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

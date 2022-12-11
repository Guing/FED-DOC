//Interface 接口初步了解

//基础的接口使用
interface Girl {
   name:string,
   age:number,
   height?:number //可选值
}

function sayHello(girl:Girl){
    console.log(girl.name);
    console.log(girl.age);
}

let girl:Girl = {
    name:'xiaohong',
    age:18
}
sayHello(girl);


//接口和类型别名的区别
//类型别名可以直接给类型，比如string，而接口必须代表对象。

type Girl1 = string;

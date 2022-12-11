//类型定义之后不可以改变
//定义类型后，可以继承类型的方法
let count:number = 123;
count.toFixed(2);

//可以通过interface定义自定义类型
interface IPerson{
     age:number,
     name:string
}
const xiaoming:IPerson = {
    age:18,
    name:'大黑'
}

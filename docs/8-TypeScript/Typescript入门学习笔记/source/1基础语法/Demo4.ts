//type annotation 类型注解
let count1:number ;
count1 = 123;



//type inference 类型推断

let countInference = 123;
const one  =1;
const two = 2;
const three = one + two;

function add(one:number ,two:number){
    return one +two;
}
add(1,2);

//也可以推断出对象中属性的类型
let xoah ={
    name:'小红',
    age:18
}



// 如果 TS 能够自动分析变量类型， 我们就什么也不需要做了
// 如果 TS 无法分析变量类型的话， 我们就需要使用类型注解

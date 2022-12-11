//TypeScript 函数泛型-函数泛型

//定义和使用泛型
//预先不知道变量类型，或者要求两个参数的类型是一样的。
//泛型变量名可以是任意值，但是一般使用T
function add<T>(one:T,two:T){
   return `${one}${two}`
}
add<string>('1','2')//传入的都是string类型


//泛型数组
function getArr<T>(arr:T[]){
    return arr;
}
//或者也可以这种写法
function getArr1<T>(arr:Array<T>){
    return arr;
}
getArr<string>(['1','2']);//数组里必须都是string类型
getArr1<number>([1,2,]);//数组里必须都是number类型



//多个泛型的定义
function join<T,P>(one:T,two:P){
    return `${one}${two}`
}
join<string,number>('1',2);


//泛型的类型推断
//泛型也是支持类型推断的，例如下面的函数调用不用写传入的泛型，也不会报错
//但是不建议大量使用类型推断，这会让你的代码易读和健壮性都会下降
function join1<T,P>(one:T,two:P){
    return `${one}${two}`
}
join1('1',2);
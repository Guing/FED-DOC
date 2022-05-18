//TypeScript 函数泛型-类中的泛型

//在类中使用泛型
class Log<T>{
    constructor( private type:T){}
    getType(){
        return this.type;
    }
}
let log = new Log<string>('error')
log.getType()


//泛型继承
//泛型可以继承接口，要求传入的泛型必须有接口的属性
interface IType{
   source:string;
}
class Log1<T extends IType >{
    constructor( private type:T){}
    getType(){
        return this.type;
    }
}
//这里使用类型推断，不用写复杂的<>
let log1 = new Log1({source:'web',type:1}) //这里传入的变量必须要有source，不然会报错
log1.getType()


//泛型约束
//泛型可以是任意类型，可以是对象、字符串、布尔、数字都是可以的，但是可以对泛型进行约束
class Log2<T extends number | string>{
    constructor(private type:T){}
    getType(){
        return this.type;
    }
}
let log2 = new Log2('1') //必须是string或者是number
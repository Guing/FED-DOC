//基础静态类型


const bool:boolean = true;
const num:number = 12;
const char:string = "str";
const isNull:null = null;
const isUndefined:undefined = undefined;
const isSymbol:Symbol =  Symbol();
const isNan:number = NaN;
const isInfinity:number = Infinity;
//对象类型：基础对象类型 数组类型 类类型 函数类型
const children:{
    name:string,
    age:number
} = {
    name:'xiaohei',
    age:18
}

const room: string[] = ['xiaobai','xiaohei'];

class person{};
const xiaohei:person = new person();

const fea:()=>string = ()=>{ return 'hello'};
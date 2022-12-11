//TypeScript 中的 interface 接口 2


//允许加入任意值
interface Girl1 {
   name:string,
   age:number,
   height?:number 
   [propname:string]:any //允许加入任何属性名和属性值
}

let girl1:Girl1 = {
    name:'xiaohong',
    age:18,
    sex:'女'
}



//接口里的方法
interface Girl2 {
    name:string,
    age:number,
    height?:number
    say():string //返回string
    
 }
 
 let girl2:Girl2 = {
     name:'xiaohong',
     age:18,
     say:()=>'hello world'
 }



 //接口和类的约束
 interface Girl3 {
    name:string,
    age:number,
    height?:number
    say():string //返回string
    
 }
 class girl3 implements Girl3{
     name='xiaohei';
     age=18;
     say(){
         return 'hello world'
     }
 }


 //接口间的继承
interface Teacher extends Girl3{
    teach():string
}
class teacher implements Teacher{
    name='lingliu';
    age=28;
    say(){return 'say'}
    teach(){return 'teach'}
}
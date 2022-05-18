//联合类型和类型保护

//联合类型
//关键符号是|(竖线)
//可以认为一个变量可能有两种或两种以上的类型

interface Man {
    name: string;
    work(): string;
}
interface Woman {
    hair: string;
    cooking(): string;
}

let person : Man | Woman;


//类型保护
//因为不能准确的判断联合类型具体的实例是什么,所以需要类型保护
//有四种方法：类型断言as，in语法，typeof 语法,instanceOf语法

//类型断言-as
function isWho(person: Man | Woman): void {
  
     (person as Man).work();
}

//in语法
function isWho2(person: Man | Woman): void {
    if("name" in person){
        person.work();
    }else{
        person.cooking();
    }
}

//typeof语法
function add(num:string|number):void{
     if(typeof num === 'number'){
         num.toFixed(2);
     }else{
         num.charAt(1)
     }
}



//instanceOf语法
//只能用于对象
class Animal{
    running(){}
}
class Person{
    work(){}
}
function getObj( obj:Animal|Person):void{
    if(obj instanceof Animal){
         obj.running();
    }else{
        obj.work();
    }
}

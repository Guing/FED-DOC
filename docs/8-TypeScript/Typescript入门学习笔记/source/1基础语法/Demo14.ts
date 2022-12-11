//类的只读属性和抽象类


//类的只读属性
class Student{
    public  readonly  _age;
    constructor(age:number){
      this._age = age;
    }
}
new Student(18)._age = 18 //只读，赋值会报错


//抽象类
//抽象方法，子类必须实现
abstract class Woman{
    run(){ 
       return 'running';
    }
    abstract say();
}
class Person10 extends Woman{
   say(){
      return 'Hello World';
   }
}
//不用实现
class Person11 extends Person10{
  
}
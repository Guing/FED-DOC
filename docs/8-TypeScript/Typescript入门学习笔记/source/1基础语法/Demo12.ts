//TypeScript 类的构造函数


//类的构造函数
class Person3{
  public name :string ;
  constructor(name:string){
      this.name=name
  }

}
const person= new Person3('xiaohei')
console.log(person.name)


//可以简写成这种形式
class Person4{
  constructor(public name:string){}
}
const person4 = new Person4('xiaobai');
person4.name


//类继承中的构造器写法
//需要在子类的构造函数中调用super()
class Person5 extends Person4{
  constructor(public name:string){
    super(name);
  }
}
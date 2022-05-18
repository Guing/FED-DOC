//TypeScript 类的 Getter、Setter 和 static 使用


//使用get,set对属性进行封装
class Person6 {
  constructor(private _age:number){ }
  get age(){
    return this._age +10;
  }
  set age(age:number){
    this._age = age +10
  }
}

//使用static修饰静态方法
class Person7{
   static say(){
      return 'hello world'
  }
}
Person7.say();
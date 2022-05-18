//TypeScript 中类的访问类型


//public 
//可以：类的内部调用，类的外部调用，类的继承调用
//Ts默认都是public
class Person{
   public name='hello world';
   say(){
     return this.name;  //内部调用
   }
}
new Person().name //外部调用
class Man extends Person{
  run(){ 
     return super.name; //继承调用
   }
}

//private
//可以：类的内部调用
//不可以：类的外部调用，类的继承调用
class Person1{
  private name = 'hello world';
  say(){
    return this.name; //内部调用
  }
}
new Person1().name //外部调用-报错
class Man1 extends Person1{
  run(){
    return super.name //继承调用-报错
  }
}


//protected
//可以：类的内部调用，类的继承调用
//不可以：类的外部调用
//一般项目比较大严谨的时候，就用这个修饰
class Person2{
  protected name = 'hello world';
  say(){
    return this.name; //内部调用
  }
}
new Person2().name //外部调用-报错
class Man2 extends Person2{
  run(){
    return super.name //继承调用
  }
}
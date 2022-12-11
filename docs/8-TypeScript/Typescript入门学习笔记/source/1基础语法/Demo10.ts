//TypeScript 中类的概念和使用


//类的基本使用
class Lady {
    content = "Hi，帅哥";
    sayHello() {
      return this.content;
    }
  }
  
  const goddess = new Lady();
  console.log(goddess.sayHello());


  //类的继承
  class Lady2 {
    content = "Hi，帅哥";
    sayHello() {
      return this.content;
    }
  }
  class XiaoJieJie extends Lady2 {
    sayLove() {
      return "I love you";
    }
  }
  
  const goddess2 = new XiaoJieJie();
  console.log(goddess2.sayHello());
  console.log(goddess2.sayLove());



  //类的重写
  class XiaoJieJie3 extends Lady {
    //重写方法
    sayHello() {
      return "Hi , honey!";
    }
  }


  //super 关键字的使用
  class XiaoJieJie4 extends Lady {
      
    //调用父类方法
    sayHello() {
        return super.sayHello() + "。你好！";
    }
  }
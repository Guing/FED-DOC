
// function log(constructor : any ){
//     console.log(constructor);
// }

// @log
// class Demo{

// }





// function log(isConsole: boolean) {

//     return function (constructor: any) {
//         if(isConsole){
//             console.log(constructor);
//         }else{
//             console.log('无');
//         }

//     }

// }

// @log(false)
// class Demo {

// }




// function log<T extends { new(...args: any[]): {} }>(constructor: T) {
//     return class extends constructor {
//         name = 'hello';
//         getName() {
//             console.log(this.name)
//         }
//     }
// }

// @log
// class Demo { }
// let demo: any = new Demo();
// demo.getName(); //hello


// function DemoDecorator() {
//     return function log<T extends { new(...args: any[]): {} }>(constructor: T) {
//         return class extends constructor {
//             name = 'hello';
//             getName() {
//                 console.log(this.name)
//             }
//         }
//     }
// }

// const Demo = DemoDecorator()(
//     class Demo { }
// )
// let demo = new Demo();
// demo.getName //可以正确获取到语法提示



// function log(target: any, key: string, descriptor: PropertyDescriptor) {
//      console.log(target,key);
//      descriptor.value = function(){
//         console.log( 'world')
//      }
// }


// class Demo {
//     @log
//     say() {
//         console.log( 'hello')
//     }
// }
// let demo = new Demo();
// demo.say() //world





// function log(target: any, name: string):any {
//      let dec:PropertyDescriptor ={
//         writable: false
//      }
//      return dec;
    
// }
// class Demo {
//     @log
//     public name = 'hello'; //报错
// }
// let demo = new Demo();
// demo.name = '123'


// function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
//     descriptor.writable = false;
//  }
 
//  class Test {
//    private _name: string;
//    constructor(name: string) {
//      this._name = name;
//    }
//    //不能向多个同名的 get/set 访问器应用修饰器。
//    get name() {
//      return this._name;
//    }
//    @visitDecorator
//    set name(name: string) {
//      this._name = name;
//    }
//  }
 
//  const test = new Test('dell');
//  test.name = 'dell lee'; //报错
//  console.log(test.name);



function extension(params: string) {
    return function (target: any) {
      console.log('类装饰器')
    }
  }
  
  function method(params: string) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
      console.log('方法装饰器')
    }
  }
  
  function attribute(params: string) {
    return function (target: any, name: string) {
      console.log('属性装饰器')
    }
  }
  
  function argument(params: string) {
    return function (target: any, name: string, index: number) {
      console.log('参数装饰器', index)
    }
  }
  
  @extension('类装饰器')
  class Employee{
    @attribute('属性装饰器')
    public name!: string
  
    @method('方法装饰器')
    salary(@argument('参数装饰器') name: string, @argument('参数装饰器') department: string) {}
  }
  
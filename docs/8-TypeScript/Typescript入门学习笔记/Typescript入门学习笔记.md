[TOC]

## 安装与编译

* 全局安装typescript编译器`npm install -g typescript`，安装完成后，使用`tsc`就可以编译当前目录的typescript文件.
* 全局安装`npm install ts-node -g`，可以直接使用`ts-node`运行ts文件，不用通过`tsc`编译再运行。
* 使用`tsc -w`可以对文件进行监视，有改动则自动编译

## 基础语法

### 基础类型

* 基础类型包括
  + 布尔值
  + 数值
  + 字符串
  + null
  + undefined
  + Symbol(ES6 中的新类型 )
  + BigInt(ES10 中的新类型 )

```ts
const bool:boolean = true;
const num:number = 12;
const char:string = "str";
const isNull:null = null;
const isUndefined:undefined = undefined;
const isSymbol:Symbol = Symbol();
```

* NaN，Infinity可以赋值给number类型

```ts
var notANumber:number = NaN;
var infinityNumber:number = Infinity;
```

* 使用`new Boolean()`返回的是一个包装对象，而不是boolean值
* 直接调用`Boolean()`也可以返回一个boolean类型
* 其他基本类型（除了 null 和 undefined）也是一样

```ts
let createdByNewBoolean: boolean = new Boolean(1);
// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.

let createdByBoolean: boolean = Boolean(1);
```

### 对象类型

* 对象类型包括
  + 基础对象类型 
  + 数组类型 
  + 类类型 
  + 函数类型

```ts
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
```

### 任意值any

* 如果一个变量被声明为any 类型，则允许被赋值为任意类型，也允许调用任何方法
* 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

```ts
let anyThing: any = 'hello';
let anyThing: any = 123;
let something; //any
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
```

### void, null, undefined, never的区别

* 在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数：
* 声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`（只在 --strictNullChecks 未指定时）：

```ts
function alertName(): void {
    alert('My name is Tom');
}
let unusable: void = undefined;
```

* 在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型：
* 与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。 `undefined` 类型的变量，可以赋值给 `number` 类型的变量，而 `void` 类型的变量不能赋值给 `number` 类型的变量：

```ts
let u: undefined = undefined;
let n: null = null;
let num: number = undefined;

let u: void;
let num: number = u;// Type 'void' is not assignable to type 'number'.
```

* never表示函数的返回值类型
* 如果一个函数是永远也执行不完的，就可以定义返回值为never, 比如无限执行或者抛出了异常，这时候就无法执行完了

```ts
function loop():never{
     while(true){}
}

function hasError():never{
    throw new Error('error');
}
```

### 类型注解与类型推断

* type annotation 类型注解就是我们手动为变量声明类型
* type inference 类型推断就是TypeScript会依照类型推断的规则推断出一个类型。

```ts
//以下代码虽然没有指定类型，但是会在编译的时候报错：
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.

```

* 如果TypeScript能够自动分析变量类型， 我们就什么也不需要做了
* 如果TypeScript无法分析变量类型的话， 我们就需要使用类型注解

> 注意：如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查：

### 函数的类型

#### 函数声明

```ts
function sum(x: number, y: number): number {
    return x + y;
}
```

> 注意，输入多余的（或者少于要求的）参数，是不被允许的：

#### 函数表达式

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

> 注意 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
> 在 ES6 中，=> 叫做箭头函数，应用十分广泛。
> 两者有所区别，不要混淆了。

#### 用接口定义函数的形状

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

#### 函数参数

* 可选参数
* 可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

* 参数默认值
* TypeScript会将添加了默认值的参数识别为可选参数：
* 此时就不受「可选参数必须接在必需参数后面」的限制了：

```ts
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

* 剩余参数
* ES6 中，可以使用`...rest`的方式获取函数中的剩余参数
* 事实上，`...rest`是一个数组。所以我们可以用数组的类型来定义它：
* 注意，rest 参数只能是最后一个参数

```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```

* 函数参数为对象(解构)时

```ts
function getAll({one,two}:{one:number,two:number}):number{
    return one +two;
}
```

#### 函数重载

* 可以使用重载定义多个不同参数的函数类型
* 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

#### 函数返回值

* 函数无返回值时定义方法
  

```ts
function sayHello():void{
     console.log(123);
}
```

* never 返回值类型。如果一个函数是永远也执行不完的，就可以定义返回值为never, 比如无限执行或者抛出了异常，这时候就无法执行完了
  

```ts
function loop():never{
     while(true){}
}

function hasError():never{
    throw new Error('error');
}
```

### 数组类型和元组

#### 数组类型的定义

* 一般数组类型的定义

```ts
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ['123', '456'];
let undefinedArr: undefined[] = [undefined];
```

* 也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组：

```ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];

```

* 也可以用接口表示数组

```ts
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

#### 多种类型数组

```ts
let allArr: (number | string)[] = [1, '234'];
```

#### 对象类型数组

* 可以通过这种方式定义对象类型数组

```ts
let objectArr: { name: string, age: number }[] = [
    { name: 'xiaohei', age: 18 }
]
```

* 也可以通过类型别名(type alias)，简化代码

```ts
type Lady = { name: string, age: number };
let object1Arr: Lady[] = [
    { name: 'xiaohei', age: 18 }
]
```

* 也可以用类进行定义

```ts
class Mother {
    name: string;
    age: number;
}
let object2Arr: Mother[] = [
    { name: 'xiaohei', age: 18 }
]
```

#### 类数组

* 类数组（Array-like Object）不是数组类型，比如 arguments：

```ts
function sum() {
    let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

* arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

```ts
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

* 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
* 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：

```ts
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

#### 元祖

* 元组看成数组的一个加强，它可以更好的控制或者说规范里边的类型
* 数组中的每个元素类型的位置给固定住了，这就叫做元组。
* 工作中不经常使用元组，维护老系统时，一种数据源时CSV，可能就需要用到元组

* 元组的基本应用

```ts
//数组中的位置要一样，不能调换
let arr1:[number,number,string] = [1,2,'str'];
```

* 元组数组

```ts
let arr2:[number,number,string][] = [
    [1,2,'str'],
    [1,2,'str'],
    [1,2,'str']
]
```

### Interface 接口

#### 基础的接口使用

* 可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
* 定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的，可见，赋值的时候，变量的形状必须和接口的形状保持一致。

```ts
interface Girl {
   name:string,
   age:number,
}

function sayHello(girl:Girl){
    console.log(girl.name);
    console.log(girl.age);
}

let girl:Girl = {
    name:'xiaohong',
    age:18
}
sayHello(girl);
```

#### 可选属性

* 可选属性的含义是该属性可以不存在
* 但这时仍然不允许添加未定义的属性

```ts
interface Girl {
   name:string,
   age:number,
   height?:number;
}
let girl:Girl = {
    name:'xiaohong',
    age:18
}
sayHello(girl);
```

#### 任意属性

* 有时候我们希望一个接口允许有任意的属性，可以使用如下方式
* 使用 [propName: string] 定义了任意属性取 string 类型的值

```ts
interface Girl1 {
   name:string,
   age:number,
   height?:number 
   [propName:string]:any //允许加入任何属性名和属性值
}

let girl1:Girl1 = {
    name:'xiaohong',
    age:18,
    sex:'女'
}
```

* 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

> 注意，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：

* 任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

#### 只读属性

* 有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：

```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

> 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：

#### 接口方法

```ts
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
```

#### 接口间的继承

* 接口与接口之间可以是继承关系

```ts
interface Teacher extends Girl3{
    teach():string
}
class teacher implements Teacher{
    name='lingliu';
    age=28;
    say(){return 'say'}
    teach(){return 'teach'}
}
```

### class类

#### 类的概念和使用

* 类的基本使用

```ts
class Lady {
    content = "Hi，帅哥";
    sayHello() {
      return this.content;
    }
  }
  
  const goddess = new Lady();
  console.log(goddess.sayHello());
```

* 类的继承

```ts
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
```

  + 类的重写

```ts
  class XiaoJieJie3 extends Lady {
    //重写方法
    sayHello() {
      return "Hi , honey!";
    }
  }
```

  + super 关键字的使用

```ts
  class XiaoJieJie4 extends Lady {
      
    //调用父类方法
    sayHello() {
        return super.sayHello() + "。你好！";
    }
  }
```

#### 类的访问类型

* 类的访问类型包括三种
  + public:
    - 可以：类的内部调用，类的外部调用，类的继承调用
  + private
    - 可以：类的内部调用
    - 不可以：类的外部调用，类的继承调用
  + protected
    - 可以：类的内部调用，类的继承调用
    - 不可以：类的外部调用

> Typescript默认都是public。一般项目比较大严谨的时候，就用protected修饰。一般private修饰的，会配有get, set属性。

```ts
//public 
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
```

#### 类的构造函数

* 类的构造函数基本使用

```ts
class Person3{
  public name :string ;
  constructor(name:string){
      this.name=name
  }

}
const person= new Person3('xiaohei')
console.log(person.name)
```

* 类继承中的构造器写法, 需要在子类的构造函数中调用`super()`

```ts
class Person5 extends Person4{
  constructor(public name:string){
    super(name);
  }
}
```

#### 类的实例属性与静态属性

* 实例属性可以简写成这种形式

```ts
class Person4{
  constructor(public name:string){}
}
const person4 = new Person4('xiaobai');
person4.name
```

* 静态属性使用static修饰

```ts
class Person7{
   static sex:string;
   static say(){
      return 'hello world'
  }
}
Person7.say();
Person7.sex;
```

#### 类的封装，get, set, readonly

* 使用get, set对属性进行封装

```ts
class Person6 {
  constructor(private _age:number){ }
  get age(){
    return this._age +10;
  }
  set age(age:number){
    this._age = age +10
  }
}
```

* 类的只读属性

```ts
class Student{
    public readonly _age;
    constructor(age:number){
      this._age = age;
    }
}
new Student(18)._age = 18 //只读，赋值会报错
```

#### 抽象类

* 抽象类有抽象方法，子类必须实现

```ts
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
//第二层子类不用实现
class Person11 extends Person10{
  
}
```

### 类与接口

#### 类实现接口

* 一个类可以实现多个接口

```ts
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

- 通过`implements`实现接口，只是约束类的实例属性，如果想约束类的构造函数和静态属性可以使用以下方法

```typescript
interface PersonStatic {
  new (num: string): void;
  age: string;
}
//约束类的静态属性和构造函数
const Person: PersonStatic = class {
  constructor(num: string) {}
  static age: string;
};
//如果还想约束类的实例属性，可以使用以下两种方法
interface PersonInstance{
    userName:string
}
//方法一： 直接使用implements
const Person1: PersonStatic = class Person1 implements PersonInstance{
    constructor(num: string) {}
    static age: string;
    userName: string;
};

//方法二： 在类的静态修饰接口中，构造函数返回实例接口定义
interface PersonStatic2 {
    new (num: string): PersonInstance;
    age: string;
  }
const Person2: PersonStatic2 = class {
    constructor(num: string) {}
    static age: string;
    userName:string;
};

```



#### 接口继承类

* TypeScript支持接口继承类，但是只会继承类的实例属性和实例方法
* 当我们在声明`class Point`时，除了会创建一个名为`Point`的类之外，同时也创建了一个名为`Point`的类型（实例的类型）。
* 所以我们既可以将`Point`当做一个类来用（使用`new Point`创建它的实例），也可以将`Point`当做一个类型来用（使用`Point`表示参数的类型）：
  

```ts
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface PointInstanceType {
    x: number;
    y: number;
}

// 等价于 interface Point3d extends PointInstanceType
interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

> 注意：声明类时创建的类型只包含其中的实例属性和实例方法，是不包含构造函数，静态属性，静态方法。

### typeof操作符

* 声明类时创建的类型只包含其中的实例属性和实例方法，是不包含构造函数，静态属性，静态方法。
* 使用typeof可以获取类的构造函数，静态属性，静态方法
* typeof 用在TypeScript 中，含义跟JavaScript中不同。不再简单的表示 跟在它后面的值的类型。
  + `let instance : ClassA` 表示的是`instance`的类型是ClassA的实例，包含实例属性和实例方法，并且不可以实例化
  + `let classA: typeof ClassA` 表示的是`classA`的类型就是ClassA，包含含构造函数，静态属性，静态方法，并且可以实例化。

```ts
class ClassA {
    static num:number;
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

let instance : ClassA;
ClassA.x;    //可以访问实例属性
//new  ClassA() 不可以实例化，会报错

let instance1:typeof  ClassA;
ClassA.num //可以访问静态属性
new  ClassA() //可以实例化。
```

### Enum 枚举

* Enum的定义

```ts
enum Way{
    FOOT,
    CAR,
    FLYER
}

function goWay(way:Way){
    if(way == Way.CAR){
        return 'car'
    }else if(way == Way.FOOT){
        return 'foot'
    }else{
        return 'flyer'
    }
}
goWay(0)
goWay(Way.CAR)
```

* enum默认是从零开始的

```ts
Way.FOOT === 0  //true
Way.CAR === 1  //true
Way.FLYER === 2  //true
```

* 可以手动赋值开始为1，未手动赋值的枚举项会接着上一个枚举项递增

```ts
enum Way1{
    FOOT = 1,
    CAR,
    FLYER
}
Way1.FOOT === 1  //true
Way1.CAR === 2  //true
Way1.FLYER === 3  //true
```

* 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：

```ts
enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};

Days["Sat"] == "S"
```

* 通过数字可以反查enum

```ts
Way1[1] === 'FOOT' //true
Way1[2] === 'CAR'  //true
Way1[3] === 'FLYER'  //true
```

* 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
* 如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：

```ts
enum Color {Red = "red".length, Green, Blue};

// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

* 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型，常出现在声明文件中。

```ts
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

### 泛型

#### 函数泛型

* 预先不知道变量类型或者要求两个参数的类型是一样的，就可以使用泛型
* 泛型变量名可以是任意值，但是一般使用T

```ts
function add<T>(one:T,two:T){
   return `${one}${two}`
}
add<string>('1','2')//传入的都是string类型
```

* 泛型数组

```ts
function getArr<T>(arr:T[]){
    return arr;
}
//或者也可以这种写法
function getArr1<T>(arr:Array<T>){
    return arr;
}
getArr<string>(['1','2']);//数组里必须都是string类型
getArr1<number>([1,2,]);//数组里必须都是number类型
```

* 多个泛型的定义

```ts
function join<T,P>(one:T,two:P){
    return `${one}${two}`
}
join<string,number>('1',2);
```

#### 泛型接口

```ts
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

#### 类中的泛型

* 在类中使用泛型

```ts
class Log<T>{
    constructor( private type:T){}
    getType(){
        return this.type;
    }
}
let log = new Log<string>('error')
log.getType()
```

#### 泛型的类型推断

* 泛型也是支持类型推断的，例如下面的函数调用不用写传入的泛型，也不会报错
* 但是不建议大量使用类型推断，这会让你的代码易读和健壮性都会下降

```ts
function join1<T,P>(one:T,two:P){
    return `${one}${two}`
}
join1('1',2);
```

#### 泛型继承-extends

* 泛型可以继承接口，要求传入的泛型必须有接口的属性

```ts
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
```

#### 泛型约束-extends

* 泛型可以是任意类型，可以是对象、字符串、布尔、数字都是可以的，但是可以通过extends对泛型进行约束。

```ts
class Log2<T extends number | string>{
    constructor(private type:T){}
    getType(){
        return this.type;
    }
}
let log2 = new Log2('1') //必须是string或者是number
```

* 多个类型参数之间也可以互相约束
* 使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。

```ts
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
```

#### 条件类型关键字-extends

`extends` 的可以是条件类型关键字，产生一个条件类型。

```typescript
type NonType<T> = T extends null | undefined ? never : T // 假如泛型参数 T 为 null 或 undefined, 返回 never；否则返回 T
// NonType<T> 变为条件类型：是什么类型，看传入的泛型 T 的类型。
let demo1: NonType<number> // demo1 的类型是 number
let demo1: NonType<null> // demo1 的类型是 never
```

#### 泛型参数的默认类型

* 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。
* 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```ts
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```

### 交叉类型，联合类型，类型保护

#### 交叉类型

* 将多个类型合并为一个类型, 相当于**集合并集**，关键符号是（&）分隔
* 把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性，多用于mixins

```ts
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

#### 联合类型

* 联合类型（Union Types）表示取值可以为多种类型中的一种，相当于**集合交集**，关键符号是**|**(竖线)
* TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
* 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型

```ts
interface Man {
    name: string;
    work(): string;
    publicMethod():void;
}
interface Woman {
    hair: string;
    cooking(): string;
    publicMethod():void;
}

let person : Man | Woman;
person.publicMethod();
```

#### 类型保护

* 因为不能准确的判断联合类型具体的实例是什么, 所以需要类型保护
* 有四种类型保护的方法：
  + 类型断言as
  + in语法
  + typeof 语法
  + instanceOf语法

* 类型断言
* 语法：
  + 可以使用`值 as 类型`，或者`<类型>值`
  + 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即值 as 类型。
  + 一般情况下，推荐使用`值 as 类型`
* 什么情况下可以使用类型断言：
  + 联合类型可以被断言为其中一个类型
  + 父类可以被断言为子类
  + 任何类型都可以被断言为 any
  + any 可以被断言为任何类型
  + 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可（前四种情况都是最后一个的特例）

```ts
function isWho(person: Man | Woman): void {
  
     (person as Man).work();
}
```

* in语法

```ts
function isWho2(person: Man | Woman): void {
    if("name" in person){
        person.work();
    }else{
        person.cooking();
    }
}
```

* typeof语法

```ts
function add(num:string|number):void{
     if(typeof num === 'number'){
         num.toFixed(2);
     }else{
         num.charAt(1)
     }
}
```

* instanceOf语法，只能用于对象

```ts
class Animal{

    running(){}

}
class Person{

    work(){}

}
function getObj( obj: Animal|Person):void{

    if(obj instanceof Animal){
         obj.running();
    }else{
        obj.work();
    }

}
```

### type类型别名

#### type基本使用

* 类型别名用来给一个类型起个新名字，类型别名常用于联合类型。

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

#### type和interface的区别

* 接口和类型别名的区别：
  + `type`类型别名可以直接给类型，比如string，
  + `interface`接口代表对象或者方法

```ts
type Girl1 = string;
```

### keyof操作符

* `keyof`操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

```ts
interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
let obj: K1 = 'name';
let obj2: K1 = 'age';
let obj3: K1 = 'location';
//let obj4:K1 = 'test';  //报错。
```

* keyof可以支持
  + 接口
  + 类
  + 基本数据类型（boolean, number, string, symbol）

```ts
//类
class Person {
  name: string = "test";
}

let sName: keyof Person;
sName = "name";
//基本数据类型
let K1: keyof boolean; // let K1: "valueOf"
let K2: keyof number; // let K2: "toString" | "toFixed" | "toExponential" | ...
let K3: keyof symbol; // let K1: "valueOf"
```

* keyof可以用于泛型约束，比如约束一个参数必须是另外参数的属性
  + 首先定义了`T`类型并使用`extends`关键字约束该类型必须是`object`类型的子类型
  + 然后使用`keyof`操作符获取`T`类型的所有键，其返回类型是联合类型
  + 最后利用`extends`关键字约束`K`类型必须为`keyof`T`联合类型的子类型

```ts
function getProperty<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

#### keyof与 typeof操作符

* `typeof`操作符用于获取变量的类型。因此这个操作符的后面接的始终是一个变量，且需要运用到类型定义当中

```ts
const COLORS = {
  red: 'red',
  blue: 'blue'
}

// 首先通过typeof操作符获取color变量的类型，然后通过keyof操作符获取该类型的所有键，
// 即字符串字面量联合类型 'red' | 'blue'
type Colors = keyof typeof COLORS 
let color: Colors;
color = 'red' // Ok
color = 'blue' // Ok

// Type '"yellow"' is not assignable to type '"red" | "blue"'.
color = 'yellow' // Error
```

### `keyof`操作符与`Partial<T>`

- keyof 遍历接口的key，获取一个所有key字面量的联合类型

```typescript
interface Person{
     age:number;
     userName:string;
     sex:string;
}

type Keys = keyof Person  // keys =  'age' | 'userName' | 'sex'
```

- 通过：接口[属性] 可以访问到接口属性的类型

```typescript
type NameType = Person['userName'] // NameType = string
```

- 通过: in 操作符可以遍历一个字面量联合类型

```typescript
type copyPerson = {
     [key in Keys]:any //拷贝一份Person接口的属性，并重新声明为any类型
}
```

- `Partial<T>`其实就是基于以上原理，实现将接口的属性转化为可选的。

```typescript
type myPartial<T> = {
     [P in keyof T]? : T[P]
}
type newPerson = myPartial<Person> // = Partial<Person>

```



### 字符串字面量类型

* 符串字面量类型用来约束取值只能是某几个字符串中的一个。

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```

### 装饰器

* 自从 ES2015 引入 class，当我们需要在多个不同的类之间共享或者扩展一些方法或行为的时候，代码会变得错综复杂，极其不优雅，这也是装饰器被提出的一个很重要的原因。
* 装饰器是一项实验性特性，若要启用实验性的装饰器特性，你必须在命令行或 tsconfig.json 里启用 experimentalDecorators 编译器选项：

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}                                                                          

```

* 装饰器本身是一个函数
* 装饰器通过 @expression 来使用, expression 表达式求值后必须为一个函数
* 装饰器是在定义的时候执行。

* 常见的装饰器有：
  + 类装饰器
  + 属性装饰器
  + 方法装饰器
  + 参数装饰器。

* 装饰器的写法：
  + 普通装饰器（无法传参）
  + 装饰器工厂（可传参）。

#### 装饰器的写法

* 普通装饰器
  

```ts

function log(constructor : any ){
    console.log(constructor);
}

@log
class Demo{
    
}
```

* 装饰器工厂，可以通过高阶函数，返回一个函数，来对装饰器做一些动态判断，并且可以传参数

```ts
function log(isConsole: boolean) {
   
    return function (constructor: any) {
        if(isConsole){
            console.log(constructor);
        }else{
            console.log('无');
        }
     
    }

}

@log(false)
class Demo {

}
```

#### 类装饰器

* 类装饰器接受的唯一的参数是构造函数
* 装饰器是在类定义的时候执行，实例化的时候不会执行。

```ts
function log<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class newDemo extends constructor {
        name = 'hello';
        getName() {
            console.log(this.name)
        }
    }
}

@log
class Demo { }
let demo: any = new Demo();
demo.getName(); //hello
```

* 这样写, new Demo返回的类型还是旧的类型，访问新类型上的属性会提示类型错误，但是可以正常运行，换一种写法。
* 将类作为参数传放，返回一个新的类

```ts
function DemoDecorator() {
    return function log<T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            name = 'hello';
            getName() {
                console.log(this.name)
            }
        }
    }
}

const Demo = DemoDecorator()(
    class Demo { }
)
let demo = new Demo();
demo.getName //可以正确获取到语法提示
```

#### 方法装饰器

* 方法装饰器有3个参数 target、name、descriptor, 和Object.defineProperty 的三个参数一样。
  + target: 对于静态成员来说是类的构造函数，对于实例成员是类的prototype原型对象
  + name: 成员的名字
  + descriptor: 成员的属性描述符

```ts
function log(target: any, key: string, descriptor: PropertyDescriptor) {
     console.log(target,key);
     descriptor.value = function(){
        console.log( 'world')
     }
}
class Demo {
    @log
    say() {
        console.log( 'hello')
    }
}
let demo = new Demo();
demo.say() //world
```

#### 访问器装饰器

* 访问器装饰器和方法装饰器一样，有3个参数 target、name、descriptor
  + target: 对于静态成员来说是类的构造函数，对于实例成员是类的prototype原型对象
  + name: 成员的名字
  + descriptor: 成员的属性描述符
* 不能向多个同名的 get/set 访问器应用修饰器。

```ts
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
 }
 
 class Test {
   private _name: string;
   constructor(name: string) {
     this._name = name;
   }
   //不能向多个同名的 get/set 访问器应用修饰器。
   get name() {
     return this._name;
   }
   @visitDecorator
   set name(name: string) {
     this._name = name;
   }
 }
 
 const test = new Test('dell');
 test.name = 'dell lee'; //报错
 console.log(test.name);

```

#### 方法参数装饰器

* 方法参数装饰器传入下列3个参数 target、name、index：
  + target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  + name: 方法的名字
  + index: 参数在函数参数列表中的索引

```ts
function log(target: any, name: string, index: Number) {
     console.log(name,index); //say 0
    
}
class Demo {
    say(@log str:string) {
        console.log( 'hello')
    }
}

```

#### 属性装饰器

* 属性装饰器有2个参数 target、name。
  + target: 对于静态成员来说是类的构造函数，对于实例成员是类的prototype原型对象
  + name: 属性的名字

* 属性装饰器没有第三个参数，但是可以通过返回descriptor，来对属性权限进行控制

```ts
function log(target: any, name: string):any {
     let dec:PropertyDescriptor ={
        writable: false
     }
     return dec;
    
}
class Demo {
    @log
    public name = 'hello'; //报错
}
let demo = new Demo();
demo.name = '123'
```

* 修改的是原型上的 name，并不是实例上的 name

```ts
// 修改的是原型上的 name
function nameDecorator(target: any, key: string): any {
  target[key] = 'lee';
}

// name 放在实例上
class Test {
  @nameDecorator
  name = 'Dell';
}

const test = new Test();
console.log(test.name) //因为实例上有name，所以这里打印出实例上的name='Dell'，而不是原型上的name='lee'
console.log((test as any).__proto__.name);

```

#### 装饰器执行顺序

* 多个装饰器可以写在一行, 比如`@foo @bar class Test{}`
* 装饰器的执行顺序是
  + 从左到右
  + 从下到上
* 不同类型的装饰器执行的顺序是
  + 属性装饰器
  + 参数装饰器
  + 方法装饰器
  + 类装饰器

```ts

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
// 属性装饰器
// 参数装饰器 1
// 参数装饰器 0
// 方法装饰器
// 类装饰器
```

### Reflect Metadata

* Reflect Metadata 主要用来在声明的时候添加和读取元数据。通过这种方式给对象添加额外的信息，是不会影响对象的结构的。
* Reflect Metadata 就是通过装饰器来给类添加一些自定义的信息，然后通过反射将这些信息提取出来，也可以通过反射来添加这些信息。

####  安装使用

* 通过 npm 安装这个库：

```bash
npm i reflect-metadata --save
```

* 而且需要在 `tsconfig.json` 中配置:

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

* 命令行使用:

```
tsc --target ES5 --experimentalDecorators --emitDecoratorMetadata
```

当启用后，只要 `reflect-metadata` 库被引入了，设计阶段添加的类型信息可以在运行时使用。

```ts
import 'reflect-metadata'

@Reflect.metadata('token', 'aW1vb2M=')
class Employee {

  @Reflect.metadata('level', 'D2')
  salary() { //定义在实例方法上的元数据，需要在实例上获取
    console.log('这是个秘密')
  }

  @Reflect.metadata('times', 'daily')
  static meeting() {}

}

const token = Reflect.getMetadata('token', Employee)
const level = Reflect.getMetadata('level', new Employee(), 'salary') //实例上
const times = Reflect.getMetadata('times', Employee, 'meeting')

console.log(token) // aW1vb2M=
console.log(level) // D2
console.log(times) // daily
```

> 注意, 实例方法与静态方法取元数据是不同的，实例方法需要在类的实例上取元数据，静态方法直接在类上取元数据。

####  API

* Reflect.defineMetadata: 元数据的命令式定义，定义对象或属性的元数据
* @Reflect.metadata: 通过装饰器将元数据应用于构造函数, 方法, 属性上。
* Reflect.hasMetadata: 检查对象或属性的原型链上是否存在元数据键
* Reflect.hasOwnMetadata: 检查对象或属性是否存在**自己**的元数据键
* Reflect.getMetadata: 获取对象或属性原型链上元数据键的元数据值
* Reflect.getOwnMetadata: 获取对象或属性的**自己**的元数据键的元数据值
* Reflect.getMetadataKeys: 获取对象或属性原型链上的所有元数据键
* Reflect.getOwnMetadataKeys: 获取对象或属性的所有**自己**的元数据键
* Reflect.deleteMetadata: 从对象或属性中删除元数据

```ts
import 'reflect-metadata'
 
// 元数据的命令式定义，定义对象或属性的元数据
Reflect.defineMetadata(metadataKey, metadataValue, target)
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)
 
// 检查对象或属性的原型链上是否存在元数据键
let result = Reflect.hasMetadata(metadataKey, target)
let result = Reflect.hasMetadata(metadataKey, target, propertyKey)
 
// 检查对象或属性是否存在自己的元数据键
let result = Reflect.hasOwnMetadata(metadataKey, target)
let result = Reflect.hasOwnMetadata(metadataKey, target, propertyKey)
 
// 获取对象或属性原型链上元数据键的元数据值
let result = Reflect.getMetadata(metadataKey, target)
let result = Reflect.getMetadata(metadataKey, target, propertyKey)
 
// 获取对象或属性的自己的元数据键的元数据值
let result = Reflect.getOwnMetadata(metadataKey, target)
let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey)
 
// 获取对象或属性原型链上的所有元数据键
let result = Reflect.getMetadataKeys(target)
let result = Reflect.getMetadataKeys(target, propertyKey)
 
// 获取对象或属性的所有自己的元数据键
let result = Reflect.getOwnMetadataKeys(target)
let result = Reflect.getOwnMetadataKeys(target, propertyKey)
 
// 从对象或属性中删除元数据
let result = Reflect.deleteMetadata(metadataKey, target)
let result = Reflect.deleteMetadata(metadataKey, target, propertyKey)
 
// 通过装饰器将元数据应用于构造函数
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // 通过装饰器将元数据应用于方法(属性)
  @Reflect.metadata(metadataKey, metadataValue)
  method() {
  }
}

```

#### 结合装饰器使用

```ts
import 'reflect-metadata'

function get(path: string): MethodDecorator {
  return (target, name) => {
    Reflect.defineMetadata('path', path, target, name)
  }
}

class Employee {
  @get('/init')
  async init() {}
}

const metadata = Reflect.getMetadata('path', new Employee(), 'init')
console.log(metadata) // '/init'
```

* 类方法 `init()` 上的装饰器 `get()` 传入元数据 `'/init'`，再通过反射拿到这个路由信息，将这些路由信息进行一定的封装，然后绑定在 `koa-router` 上，就能达到自动加载路由的功能。

## 模块系统

### 全局模块

* 如果一个文件中没有顶级 `import` 或者 `export` ，那么它的内容就是全局的，整个项目可见的，这就容易造成变量命名冲突

```ts
// a.ts
let a1 = 100;
let a2 = 200;
```

```ts
// b.ts
// ok, 100
console.log(a1);
// error，因为a.ts没有`import` 或者 `export`，所有a.ts里的a2是个全局变量,b.ts里再声明一个a2就冲突了
let a2 = 300;
```

### 文件模块

* 任何一个包含了顶级 `import` 或者 `export` 的文件都会当做一个模块，在 `TypeScript` 中也称为外部模块。

### 命名空间

* 在 `TS` 中， `export` 和 `import` 称为 外部模块， `TS` 中还支持一种内部模块 `namespace` ，它的主要作用只是单纯的在文件内部（模块内容）隔离作用域

```ts
namespace k1 {
    let a = 10;
    export var obj = {
        a
    }
}

namespace k2 {
    let a = 20;
    console.log(k1.obj);
}
```

* 命名空间也可以嵌套

```ts
namespace Components {
    export namespace SubComponents {
      export class Test {}
    }
  
    //someting ...
  }
Components.SubComponents.Test
```

### 模块编译

* `TypeScript` 编译器也能够根据相应的编译参数，把代码编译成指定的模块系统使用的代码
* 在 `TypeScript` 编译选项中， `module` 选项是用来指定生成哪个模块系统的代码，可设置的值有： 
  + `"none"`

  + `"commonjs"`

  + `"amd"`

  + `"udm"`

  + `"es6"` / `"es2015/esnext"`

  + `"System"`

* `target=="es3" or "es5"`：默认使用 `commonjs`
  

### 模块默认值

#### 导出默认值

* 如果一个模块没有默认导出, 则在引入该模块的时候，需要使用下列一些方式来导入：解构、别名

```ts
// m1.ts
export let obj = {
  x: 1
}
```

```ts
// main.ts
// error: 提示 m1 模块没有默认导出
import v from './m1'

// 可以简单的使用如下方式，解构
import {obj} from './m1'
console.log(obj.x)
// 或者设置别名
import * as m1 from './m1'
console.log(m1.obj.x)
```

#### 非 `ESM` 模块中没有默认值的问题

* 在 `ESM` 中模块可以设置默认导出值
* 但是在 `CommonJS` 、`AMD` 中是没有默认值设置的，它们导出的是一个对象（`exports`）

```ts
export default '开课吧';
```

```javascript
module.exports.obj = {
    x: 100
}
```

* 在 `TypeScript` 中导入这种模块的时候会出现 `模块没有默认导出的错误提示`。
* 这时候，可以有简单一些的做法：

```ts
import * as m from './m1.js'
```

* 也可以通过`tsconfig.json`中配置选项解决：

* **allowSyntheticDefaultImports**，设置为：`true`，允许从没有设置默认导出的模块中默认导入。

* 虽然通过上面的方式可以解决编译过程中的检测问题，但是编译后的具体要运行代码还是有问题的

* **esModuleInterop**，设置为：`true`，则在编译的同时生成一个 `__importDefault` 函数，用来处理具体的 `default` 默认导出

> 注意：以上设置只能当 `module` 不为 `es6+` 的情况下有效

### 加载JS模块和JSON文件模块

#### 加载JS模块

* 默认情况下 `tsc` 是不对非 `ts` 模块文件进行处理的，可以通过 `allowJs` 选项开启对JS文件的支持，在`tsconfig.json`文件里设置
  

```json
{
    "compilerOptions": {
        "allowJs": true, //  这个选项，允许处理js文件
    },
   
}
```

#### 加载JSON模块

`TypeScript 2.9+` 版本添加了一个新的编译选项： `resolveJsonModule` ，它允许我们把一个 `JSON` 文件作为模块进行加载

```json
{
    "name": "zMouse",
    "age": 35,
    "gender": "男"
}
```

```ts
import * as userData from './data.json';
console.log(userData.name);
```

### 三斜线指令

`///<reference types=“UMDModuleName/globalName” />` ts 早期模块化的标签, 用来导入依赖, ES6广泛使用后, 在编写TS文件中不推荐使用, 除了以下的场景使用 `///` , 其他场景使用 `import` 代替在声明文件中, 依赖全局库或被全局库依赖, 具体:

* 库依赖全局库, 因为全局库不能使用import导入
* 全局库依赖于某个 UMD 模块，因为全局库中不能出现import/export, 出现则为npm/UMD

> 注意: 三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释。

## 声明文件

* 通常我们会把声明语句放到一个单独的文件，比如jQuery.d.ts，这就是声明文件
* 声明文件必需以 .d.ts 为后缀

### 第三方声明文件

* 若第三方库是ts编写，且无声明文件
  + 可以使用--declaration配置选项来生成； 可以在命令行中添加 --declaration（简写 -d），或者在 tsconfig.json 中添加 declaration:true 选项
  
* 若第三方库是有声明文件的, 可能存在以下位置
  + 在项目根目录下有index.d.ts文件
  + 入口文件（package.json 中的 main 字段指定的入口文件），有一个同名不同后缀的 .d.ts 文件
  + package.json 中的 types 或 typings 字段指定一个类型声明文件地址
  + 通过@types查找，`npm install @types/jquery --save-dev`

### 书写声明文件

* 库的使用场景主要有以下几种：
  + 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
  + npm 包：通过 `import foo from 'foo'` 导入，符合 ES6 模块规范
  + UMD 库：既可以通过 `<script>` 标签引入，又可以通过 `import` 导入
  + 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构
  + 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
  + 模块插件：通过 `<script>` 或 `import` 导入后，改变另一个模块的结构

#### 全局变量

* 全局变量是最简单的一种场景，比如通过`<script>`标签引入`jQuery`，注入全局变量`$`和`jQuery`。
* 使用全局变量的声明文件时
  + 如果是以 `npm install @types/xxx --save-dev` 安装的，则不需要任何配置
  + 如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 `src` 目录下。如果没有生效，可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

```plain
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```

* 全局变量的声明文件主要有以下几种语法：
  + [`declare var`](#declare-var) 声明全局变量
  + [`declare function`](#declare-function) 声明全局方法
  + [`declare class`](#declare-class) 声明全局类
  + [`declare enum`](#declare-enum) 声明全局枚举类型
  + [`declare namespace`](#declare-namespace) 声明（含有子属性的）全局对象
  + [`interface` 和 `type`](#interface-he-type) 声明全局类型

> 注意：声明语句中只能定义类型，切勿在声明语句中定义具体的实现

##### `declare var`

* 使用 `const` 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了
* 使用 `let` 与使用 `var` 没有什么区别

```ts
declare var jQuery: (selector: string) => any;
declare let jQuery1: (selector: string) => any;
declare const jQuery2: (selector: string) => any;
```

##### `declare function`

* 在函数类型的声明语句中，函数重载也是支持的

```ts
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;
```

##### `declare class`

* 当全局变量是一个类的时候，我们用 `declare class` 来定义它的类型

```ts

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
```

##### `declare enum`

* `Directions.d.ts` 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。

```ts
// src/Directions.d.ts

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

##### `declare namespace`

* `declare namespace` 表示全局变量是一个对象，包含很多子属性。
* 在 `declare namespace` 内部，直接使用 `function ajax` 来声明函数，而不是使用 `declare function ajax`。类似的，也可以使用 `const`, `class`,  `enum` 等语句
* 如果对象拥有深层的层级，则需要用嵌套的 `namespace` 来声明深层的属性的类型

```ts
declare namespace jQuery {
   function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
     namespace fn {
        function extend(object: any): void;
    }
}
}
jQuery.ajax('/api/get_something');
jQuery.version;
jQuery.fn.extend();
```

##### `interface` 和 `type`

* 除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 `interface` 或 `type` 来声明一个全局的接口或类型
* 暴露在最外层的 `interface` 或 `type` 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 `namespace` 下

```ts
interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
type mySettings = AjaxSettings | undefined

declare namespace jQuery {
   interface Config {
        name:string
    }
    
}
let settings: AjaxSettings = {
    method: 'POST',
    data:{}
};
let config:jQuery.Config;
```

> 注意： `interface` 和 `type` 前是不需要 `declare` 的。

#### npm 包

* npm 包的声明文件主要有以下几种语法：
  + [`export`](#export) 导出变量
  + [`export namespace`](#export-namespace) 导出（含有子属性的）对象
  + [`export default`](#export-default) ES6 默认导出
  + [`export =`](#export-1) commonjs 导出模块

##### npm包声明文件位置

* 由于是通过 `import` 语句导入的模块，所以声明文件存放的位置也有所约束
* 创建一个 `types` 目录，专门用来管理自己写的声明文件，将 `foo` 的声明文件放到 `types/foo/index.d.ts` 中。这种方式需要配置下 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段。

```plain
/path/to/project
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
```

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
```

##### `export`

* npm 包的声明文件与全局变量的声明文件有很大区别
  + 在 npm 包的声明文件中，使用 `declare` 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量
  + 只有在声明文件中使用 `export` 导出，然后在使用方 `import` 导入后，才会应用到这些类型声明。
  + 也可以使用 `declare` 先声明多个变量，最后再用 `export` 一次性导出。

```ts
// types/foo/index.d.ts

declare const name: string;
declare function getName(): string;
export class Animal {
    constructor(name: string);
    sayHi(): string;
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}
export interface Options {
    data: any;
}
export {name ,getName }
```

```ts
// src/index.ts

import { name, getName, Animal, Directions, Options } from 'foo';

console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
    data: {
        name: 'foo'
    }
};
```

##### `export namespace`

* `export namespace` 用来导出一个拥有子属性的对象

```ts
// types/foo/index.d.ts

export namespace foo {
    const name: string;
    namespace bar {
        function baz(): string;
    }
}
```

```ts
// src/index.ts

import { foo } from 'foo';

console.log(foo.name);
foo.bar.baz();
```

##### `export default`

* 在类型声明文件中，`export default` 用来导出默认值的类型
* 只有 `function`、`class` 和 `interface` 可以直接默认导出，其他的变量需要先定义出来，再默认导出
* 针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面

```ts
// types/foo/index.d.ts

export default Directions;

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

##### `export =` 与commonjs模块

* 在 ts 中，针对commonjs模块导出，有多种方式可以导入
  + 第一种方式是 `const ... = require`
  + 第二种方式是 `import ... from`，注意针对整体导出，需要使用 `import * as` 来导入
  + 第三种方式是 `import ... require`，这也是 ts 官方推荐的方式

```js
// 整体导出
module.exports = foo;
// 单个导出
exports.bar = bar;
```

```js
//const ... = require
const foo = require('foo'); // 整体导入
const bar = require('foo').bar; // 单个导入

//import ... from
import * as foo from 'foo'; // 整体导入
import {
    bar
} from 'foo'; // 单个导入

//import ... require
import foo = require('foo'); // 整体导入
import bar = foo.bar; // 单个导入
```

* 对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 `export =` 这种语法了
* 使用了 `export =` 之后，就不能再单个导出 `export { bar }` 了。所以我们通过声明合并，使用 `declare namespace foo` 来将 `bar` 合并到 `foo` 里

```ts
// types/foo/index.d.ts

export = foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}
```

#### UMD 库

* 既可以通过 `<script>` 标签引入，又可以通过 `import` 导入的库，称为 UMD 库。
* 相比于 npm 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 `export as namespace`。

##### `export as namespace`

* 一般使用 `export as namespace` 时，都是先有了 npm 包的声明文件，再基于它添加一条 `export as namespace` 语句，即可将声明好的一个变量声明为全局变量

```ts
// types/foo/index.d.ts

export as namespace foo;
export = foo;
// export default foo;//也可以与 `export default` 一起使用

declare function foo(): string;
declare namespace foo {
    const bar: number;
}
```

#### 直接扩展全局变量

* 有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 ts 编译错误
* 此时就需要扩展全局变量的类型。比如扩展 `String` 类型
  + 通过声明合并，使用 `interface String` 即可给 `String` 添加属性或方法。
  + 也可以使用 `declare namespace` 给已有的命名空间添加类型声明

```ts
interface String {
    prependHello(): string;
}

'foo'.prependHello();
```

```ts
// types/jquery-plugin/index.d.ts

declare namespace JQuery {
    interface CustomOptions {
        bar: string;
    }
}

interface JQueryStatic {
    foo(options: JQuery.CustomOptions): string;
}
```

#### 在 npm 包或 UMD 库中扩展全局变量

* 对于一个 npm 包或者 UMD 库的声明文件，只有 `export` 导出的类型声明才能被导入。
* 所以对于 npm 包或 UMD 库，如果导入此库之后会扩展全局变量，则需要使用另一种语法在声明文件中扩展全局变量的类型，那就是 `declare global`。

##### `declare global`

* 使用 `declare global` 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型

```ts
// types/foo/index.d.ts

declare global {
    interface String {
        prependHello(): string;
    }
}

export {};
```

```ts
// src/index.ts

'bar'.prependHello();
```

> 注意：即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。

#### 模块插件-扩展原有模块类型

* 通过 `import` 导入一个模块插件，可以改变另一个原有模块的结构，这个时候需要扩展原有模块的类型。
* `declare module`，它可以用来扩展原有模块的类型。

##### `declare module`

* 需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 `declare module` 扩展原有模块

```ts
// types/my-moment/index.d.ts

import * as moment from 'moment'; //引用原有模块
//扩展原有模块
declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
```

```ts
// src/index.ts

import * as moment from 'moment';
import 'my-moment';

moment.foo();
```

* `declare module` 也可用于在一个文件中一次性声明多个模块的类型

```ts
// types/foo-bar.d.ts

declare module 'foo' {
    export interface Foo {
        foo: string;
    }
}

declare module 'bar' {
    export function bar(): string;
}
```

```ts
// src/index.ts

import { Foo } from 'foo';
import * as bar from 'bar';

let f: Foo;
bar.bar();
```

### 声明文件中的依赖

#### 局部模块的文件依赖

* 一个声明文件有时会依赖另一个声明文件中的类型，这时可以通过 `import` 导入另一个声明文件中的类型

```ts
// types/my-moment/index.d.ts

import * as moment from 'moment'; //引用原有模块
//扩展原有模块
declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
```

> 注意：使用import之后，会变成一个局部模块，而不是全局模块

#### 全局模块的文件依赖

* 在全局变量的声明文件中，是不允许出现 `import`,  `export` 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了
* 使用三斜线指令`///`可以解决全局模块的文件依赖, 在以下情况下使用
  + 当我们在**书写**一个全局变量的声明文件时
  + 当我们需要**依赖**一个全局变量的声明文件时
*  `///`有`types` 和 `path` 两种不同的指令
   - `types` 用于声明对另一个库的依赖
   - `path` 用于声明对另一个文件的依赖

```ts
// types/jquery-plugin/index.d.ts

/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string;
```

```ts
// src/index.ts

foo({});
```

> 注意，三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释。

##### 拆全局模块声明文件

* 当我们的全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将它们一一引入，来提高代码的可维护性。
* 比如 `jQuery` 的声明文件就是这样的：

```ts
// node_modules/@types/jquery/index.d.ts

/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;
```

### 自动生成声明文件

* 如果库的源码本身就是由 ts 写的，则通过以下方式可以自动生成声明文件
  + 在命令行中添加 `--declaration`（简写 `-d`）
  + 在 `tsconfig.json` 中添加 `declaration` 选项，还有其他几个和声明有关的配置
    - `declarationDir` 设置生成 `.d.ts` 文件的目录
    - `declarationMap` 对每个 `.d.ts` 文件，都生成对应的 `.d.ts.map`（sourcemap）文件
    - `emitDeclarationOnly` 仅生成 `.d.ts` 文件，不生成 `.js` 文件

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
    }
}
```

* 使用 `tsc` 自动生成声明文件时，每个 ts 文件都会对应一个 `.d.ts` 声明文件。
* 这样的好处是，使用方不仅可以在使用 `import foo from 'foo'` 导入默认的模块时获得类型提示，还可以在使用 `import bar from 'foo/lib/bar'` 导入一个子模块时，也获得对应的类型提示。

### 声明合并

* 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：

#### 函数的合并

* 我们可以使用重载定义多个函数类型：

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

#### 接口的合并

* 接口中的属性在合并时会简单的合并到一个接口中：

```ts
interface Alarm {
    price: number;
}
interface Alarm {
    weight: number;
}
```

相当于：

```ts
interface Alarm {
    price: number;
    weight: number;
}
```

> 注意，**合并的属性的类型必须是唯一的**：

```ts
interface Alarm {
    price: number;
}
interface Alarm {
    price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错
    weight: number;
}
```

```ts
interface Alarm {
    price: number;
}
interface Alarm {
    price: string;  // 类型不一致，会报错
    weight: number;
}

// index.ts(5,3): error TS2403: Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.
```

* 接口中方法的合并，与函数的合并一样：

```ts
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    weight: number;
    alert(s: string, n: number): string;
}
```

相当于：

```ts
interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
```

#### 类的合并

类的合并与接口的合并规则一致。

### 发布声明文件

* 发布声明文件有两种方案，优先选择第一种方案，不需要额外增加单独的声明文件库的依赖
  + 将声明文件和源码放在一起
  + 将声明文件发布到 `@types` 下

#### 将声明文件和源码放在一起

* 如果声明文件是通过 `tsc` 自动生成的，那么无需做任何其他配置，只需要把编译好的文件也发布到 npm 上，使用方就可以获取到类型提示了。
* 如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别：
  + 给 `package.json` 中的 `types` 或 `typings` 字段指定一个类型声明文件地址
  + 在项目根目录下，编写一个 `index.d.ts` 文件
  + 针对入口文件（`package.json` 中的 `main` 字段指定的入口文件），编写一个同名不同后缀的 `.d.ts` 文件

```json
{
    "name": "foo",
    "version": "1.0.0",
    "main": "lib/index.js",
    "types": "foo.d.ts",
}
```

* `typings` 与 `types` 一样，只是另一种写法。
* 如果没有指定 `types` 或 `typings` ，那么就会在根目录下寻找 `index.d.ts` 文件，将它视为此库的类型声明文件。
* 如果没有找到 `index.d.ts` 文件，那么就会寻找入口文件（ `package.json` 中的 `main` 字段指定的入口文件）是否存在对应同名不同后缀的 `.d.ts` 文件。
* 有的库为了支持导入子模块，比如 `import bar from 'foo/lib/bar'` ，就需要额外再编写一个类型声明文件 `lib/bar.d.ts` 或者 `lib/bar/index.d.ts` ，这与自动生成声明文件类似，一个库中同时包含了多个类型声明文件。

#### 将声明文件发布到 `@types` 下

* 与普通的 npm 模块不同， `@types` 是统一由 DefinitelyTyped 管理的。
* 要将声明文件发布到 `@types` 下，就需要给 DefinitelyTyped 创建一个 pull-request，其中包含了类型声明文件，测试代码，以及 `tsconfig.json` 等。
* pull-request 需要符合它们的规范，并且通过测试，才能被合并，稍后就会被自动发布到 `@types` 下。
* 在 DefinitelyTyped 中创建一个新的类型声明，需要用到一些工具，DefinitelyTyped 的文档中已经有了[详细的介绍](https://github.com/DefinitelyTyped/DefinitelyTyped#create-a-new-package)，这里就不赘述了，以官方文档为准。

## 配置文件

* 配置文件文档查询网址：[https://www.tslang.cn/docs/handbook/compiler-options.html ](https://www.tslang.cn/docs/handbook/compiler-options.html )

### 配置文件的生成与使用

* tsconfig.json文件可以通过`tsc --init`命令生成的
* 运行指令加文件名:`tsc [file]`，是不会读取tsconfig.json配置文件进行编译的。
* 直接运行`tsc`，才会读取tsconfig.json配置文件进行转义的。

### 包含与排除编译文件

* include配置 
* include属性是用来指定要编译的文件的

```json
{
    "include":["demo.ts"],
    "compilerOptions": {
        //any something
        //........
    }
  }
```

* exclude配置
* exclude是不包含，除什么文件之外的才进行编译

```json
{
    "exclude":["demo2.ts"],
   "compilerOptions": {
       //any something
       //........
   }
 }
```

* files
* files的配置效果和include几乎一样

```json
{
    "files":["demo.ts"],
    "compilerOptions": {
        //any something
        //........
    }
  }
```

### compilerOptions 常用配置项

* removeComments
  + 对编译出来的js文件是否显示注释（注解）

* strict
  + 代表我们的编译和书写规范，要按照TypeScript最严格的规范来写，如果我们把这个设置为false或者注释掉，意思是我们可以对设置一些不严格的写法。
  + 如果strict为true，则代表整块Type Checking的其他配置都默认为true。并且单独设置其他配置为false也不起效。要单独设置他配置则需要先把strict设置为false，或者注释掉。

* noImplicitAny
  + noImplicitAny属性的作用是，允许你的注解类型 any 不用特意表明

* strictNullChecks
  + 不强制检查 NULL 类型
  + 比如：const jspang: string = null; 

* outDir
  + 指定输出目录
  
* outFile
  + 将多个ts文件生成一个文件的设置，但是如果设置了它，就不再支持"module":"commonjs"设置了，需要把它改成"module":"amd"

* rootDir
  + 指源码目录

* allowJs
  + typescript文件的后缀不一定是ts，可能是js，开启这个允许编译js文件

* sourceMap
  + 在打包的过程中就会给我们生成sourceMap文件

* noUnusedLocals
  + 没有使用的变量，在编译的时候会提示。

* noUnusedParameters
  + 没有使用的函数参数，在编译的时候会提示。

## 内置对象

* JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。
* 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

### ECMAScript 的内置对象

* ECMAScript 标准提供的内置对象有：
  + `Boolean`

  + `Error`

  + `Date`

  + `RegExp`

  + 其他……

```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

### DOM 和 BOM 的内置对象

* DOM 和 BOM 提供的内置对象有：
  + `Document`
  
  + `HTMLElement`
  
  + `Event`
  
  + `NodeList`

  + 其他……

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

### TypeScript核心库的定义文件

* [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。

* 当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了，比如：
* `addEventListener` 方法是在TypeScript核心库中定义的，所以 `e` 被推断成了 `MouseEvent` ，而 `MouseEvent` 是没有 `targetCurrent` 属性的，所以报错了。

```ts
document.addEventListener('click', function(e) {
    console.log(e.targetCurrent);
});

// index.ts(2,17): error TS2339: Property 'targetCurrent' does not exist on type 'MouseEvent'.
```

### 用 TypeScript 写 Node.js

> 注意，TypeScript 核心库的定义中不包含 Node.js 部分。

* Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```bash
npm install @types/node --save-dev
```

## 参考文档

* [TypeScript 入门教程](https://ts.xcatliu.com/advanced/declaration-merging.html)
* [慕课网 TypeScript 入门教程](http://www.imooc.com/wiki/typescriptlesson/tsintroduction.html)

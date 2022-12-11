//数组类型

//一般数组类型的定义
let numArr: number[] = [1, 2, 3];
let strArr: string[] = ['123', '456'];
let undefinedArr: undefined[] = [undefined];


//多种类型数组
let allArr: (number | string)[] = [1, '234'];

//数组中对象类型的定义
let objectArr: { name: string, age: number }[] = [
    { name: 'xiaohei', age: 18 }
]


//类型别名(type alias)
type Lady = { name: string, age: number };
let object1Arr: Lady[] = [
    { name: 'xiaohei', age: 18 }
]

//也可以用类进行定义
class Mother {
    name: string;
    age: number;
}
let object2Arr: Mother[] = [
    { name: 'xiaohei', age: 18 }
]
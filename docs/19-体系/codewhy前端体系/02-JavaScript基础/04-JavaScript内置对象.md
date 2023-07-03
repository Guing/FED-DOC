## 包装类型

### 3.1. 奇怪现象(悖论)

* 字符串/数字 原始类型
* 没有属性/方法
* 但是发现可以获取属性/调用方法

```js
var name = "Hello World"
// 在调用原始类型的属性或者方法时, 内部的操作 name = new String(name)
console.log(name.length)
console.log(name.split(" "))
console.log(height.toFixed(2))
```

原因:

* 根据原始值，创建一个原始类型对应的包装类型对象;
* 调用对应的属性或者方法，返回一个新的值;
* 创建的包装类对象被销毁;
* 通常JavaScript引擎会进行很多的优化，它可以跳过创建包装类的过程在内部直接完成属性的获取或者方法的调用。

* 常见的包装类型有:
  * String、
  * Number、
  * Boolean、
  * Symbol、
  * BigInt类型
  
* 注意事项:null、undefined没有任何的方法，也没有对应的“对象包装类”;

### 3.2. Number包装类型

#### 类属性

* Number.MAX_SAFE_INTEGER:JavaScript 中最大的安全整数 (2^53 - 1);  
* Number.MIN_SAFE_INTEGER:JavaScript 中最小的安全整数 -(2^53 - 1)

```js
// 类属性
    // Number中本身是有自己的属性
    console.log(Number.MAX_VALUE)
    console.log(Number.MIN_VALUE)
    // integer: 整数
    console.log(Number.MAX_SAFE_INTEGER)
    console.log(Number.MIN_SAFE_INTEGER)
```

#### 实例方法

* toString(base)
  * 将数字转成字符串，并且按照base进制进行转化

```js
 // 对象的方法
    // toString(base)
    var num = 1000
    console.log(num.toString(), typeof num.toString())
    console.log(num.toString(2))
    console.log(num.toString(8))
    console.log(num.toString(16))
```

* toFixed(digitals)
  * 格式化一个数字，输出字符串，保留digits位的小数;

```js
  // toFixed的使用(重要)
    var pi = 3.1415926
    console.log(pi.toFixed(3))
```

#### 类方法

* Number.parseInt(string[, radix])，将字符串解析成整数，
  * 也有对应的全局方法parseInt;
* Number. parseFloat(string)，将字符串解析成浮点数
  * 也有对应的全局方法parseFloat

```js
 // 类的方法
    // parseInt
    // parseFloat
    // 整数: 123
    // 浮点数: 小数 123.321
    var num1 = "123.521"
    console.log(Number(num1).toFixed(0))
    console.log(Number.parseInt(num1))
    console.log(Number.parseFloat(num1))

    // window对象上面
    console.log(parseInt(num1))
    console.log(parseFloat(num1))
```

更多Number的知识，可以查看MDN文档:
  <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number>

### 3.3. Math对象使用

* Math是一个内置对象(不是一个构造函数)，它拥有一些数学常数属性和数学函数方法;

#### Math常见的属性

* Math.PI: 圆周率，约等于 3.14159;

#### Math常见方法

* Math.floor:向下舍入取整
* Math.ceil:向上舍入取整
* Math.round:四舍五入取整
* Math.pow(x, y):返回x的y次幂
* Math.random:生成0~1的随机数(包含0，不包含1)  

```js
// Math对象的属性
    console.log(Math.PI)

    // Math对象的方法
    var num = 3.55
    console.log(Math.floor(num)) // 3
    console.log(Math.ceil(num)) // 4
    console.log(Math.round(num)) // 4
    console.log(Math.pow(2, 4))//16

     // random: 随机生成 [0, 1)
    console.log(Math.random())

    // 需求: [5~50)的随机数
    // 可使用以下公式，生成[a, b)的随机数时
    // 1: x = b - a
    // 2: y = a
    // 3: Math.floor(Math.random() * x) + y
    for (var i = 0; i < 1000; i++) {
      var randomNum = Math.floor(Math.random() * 45) + 5
      console.log(randomNum)
    }
```

Math中还有很多其他数学相关的方法，可以查看MDN文档:
  <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math>

### 3.4. String包装类型

* 创建方式 new String()

#### String常见的属性

length:获取字符串的长度;

```js

    var message = "Hello World"
    // 1.属性: length
    console.log(message.length)

```

#### 访问字符串的字符

* 使用方法一:通过字符串的索引 str[0]
* 使用方法二:通过str.charAt(pos)方法
* 它们的区别是索引的方式没有找到会返回undefined，而charAt没有找到会返回空字符串;

```js
    var message = "Hello World"

    // 2.访问字符串中某个位置的字符
    console.log(message[4])
    console.log(message.charAt(4))
    console.log(message[20])
    console.log(message.charAt(20))
```

#### 遍历

* 普通的for循环
* for..of方式
  * 可迭代对象
  * 字符串/数组

```js
    var message = "Hello World"
 // 3.字符串的遍历
    // for普通遍历
    for (var i = 0; i < message.length; i++) {
      console.log(message[i])
    }

    // for..of的遍历 -> 迭代器
    // 目前可迭代对象: 字符串/数组
    // 对象是不支持for..of
    // String对象内部是将字符串变成了一个可迭代对象
    for (var char of message) {
      console.log(char)
    }
```

#### 字符串不可变性

* 字符串在定义后是不可以修改的，所以下面的操作是没有任何意义的;

```js
    var message = "Hello World"
    // 无法修改成功
    message[2] = "a"
    console.log(message)
```

#### 实例方法-修改字符串

* toLowerCase():将所有的字符转成小写;
* toUpperCase() :将所有的字符转成大写;
  * 这两个方法也不会修改原本的字符串，只会返回新的字符串

```js

console.log( "ALPHABET".toLowerCase() );// "alphabet"
console.log('alphabet'.toUpperCase()); // 'ALPHABET'
```

* repace:查找并替换字符串
  * str.replace(regexp|substr, newSubStr|function)
  * 匹配值如果是字符串，则仅第一个匹配项会被替换
  * 替换值可以是一个字符串
  * 替换字符串可以使用的特殊变量名
    * `$$`:插入一个 "$"。
    * `$&`:插入匹配的子串。
    * $`:插入当前匹配的子串左边的内容。
    * `$'`:插入当前匹配的子串右边的内容。
    * `$n`:假如第一个参数是 RegExp对象，并且 n 是个小于 100 的非负整数，那么插入第 n 个括号匹配的字符串。
      * 提示：索引是从 1 开始。如果不存在第 n 个分组，那么将会把匹配到到内容替换为字面量。
      * 比如不存在第 3 个分组，就会用“$3”替换匹配到的内容。
    * `$<Name>`:这里*Name* 是一个分组名称。
      * 如果在正则表达式中并不存在分组（或者没有匹配），这个变量将被处理为空字符串。
      * 只有在支持命名分组捕获的浏览器中才能使用。
  * 替换值可以是一个每次匹配都要调用的回调函数
    * 函数的返回值作为替换字符串
    * 特殊变量名不能被使用
    * 函数的参数
      * match：匹配的子串。（对应于上述的$&。）
      * p1,p2, ...：假如第一个参数是RegExp 对象，则代表第 n 个括号匹配的字符串。
        * 对应于上述的$1，$2 等。
        * 例如，如果是用 /(\a+)(\b+)/ 这个来匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+。
      * offset：匹配到的子字符串在原字符串中的偏移量。
        * 比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1
      * string：被匹配的原字符串。
      * NamedCaptureGroup：命名捕获组匹配的对象
* replaceAll():所有匹配到的字符串都会被替换

```js


//使用了正则表达式，使用全局搜索和忽略大小写标示
var re = /apples/gi;
var str = "Apples are round, and apples are juicy.";
var newstr = str.replace(re, "oranges");

console.log(newstr);// oranges are round, and oranges are juicy.

//使用特殊变量
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");

console.log(newstr);// Smith, John


//使用替换函数
function replacer(match, p1, p2, p3, offset, string) {
 
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%



//所有b都会被替换
'aabbcc'.replaceAll('b', '.');
// 'aa..cc'
```

* trim 从字符串的两端清除空格
  * 指所有的空白字符（空格、tab、不换行空格等）以及所有行终止符字符（如 LF、CR 等）
* trimEnd() 方法会删除字符串末尾的空白字符
  * trimRight() 是这个方法的别名
* trimStart() 方法会删除字符串开头的空白字符。
  * trimLeft() 是此方法的别名。

```js
const greeting = `   
\n
Hello world!   `;

console.log(greeting);
// Expected output: "   Hello world!   ";

console.log(greeting.trim());
// Expected output: "Hello world!";
console.log(greeting.trimEnd());
// Expected output: "   Hello world!";
console.log(greeting.trimStart());
// Expected output: "Hello world!   ";
```

#### 实例方法-查找字符串

* indexOf：查找字符串位置
  * indexOf(searchString, fromIndex)
  * 从fromIndex开始，查找searchValue的索引;
    * 情况一: 搜索到, 搜索字符串所在索引位置
    * 情况二: 没有搜索到, 返回-1
* lastIndexOf:相似的方法,从最后开始查找(用的较少)

```js
 var message = "my name is why."
 var name = "why"

     /*
      index:
        情况一: 搜索到, 搜索字符串所在索引位置
        情况二: 没有搜索到, 返回-1
    */
 var index = message.indexOf(name)
 if (message.indexOf(name) !== -1) {
   console.log("message中包含name")
 } else {
   console.log("message不包含name")
 }
```

* includes:是否包含字符串（ES6）
  * includes(searchString, position)
  * 从position位置开始查找searchString，
    * 根据情况返回 true 或 false
  * 区分大小写的搜索

```js
 var message = "my name is why."
 var name = "why"
 
 if(message.includes(name)){
  console.log("包含");
 }else{
  console.log("不包含");
 }

```

* match:使用正则检索返回一个匹配数组
  * str.match(regexp)
  * regexp：一个正则表达式对象或者任何具有 Symbol.match 方法的对象
    * 如果不是，会使用 new RegExp(regexp) 将其隐式地转换为 RegExp
    * 如果没有参数，将会得到一个包含空字符串的数组：[""]，因为这等价于 match(/(?:)/)
    * 如果使用 g 标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组
      * ['完整匹配的结果']
    * 如果不使用 g 标志，返回第一个完整匹配及其相关的捕获组
      * groups: 一个命名捕获组对象，其键是捕获组名称，值是捕获组，如果未定义命名捕获组，则为 undefined。
      * index: 匹配的结果的开始位置
      * input: 搜索的字符串。
      * [’完整匹配的结果‘,'第一个括号的匹配','第二个括号的匹配'....,groups,index,input]

```js
//使用 g 标志，则将返回完整结果，但不会返回捕获组使用
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/gi;
var found = str.match(re);

console.log(found); //['see Chapter 3.4.5.1']

//不加g，则返回完整结果，捕获组，其他属性
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);
// 0: "see Chapter 3.4.5.1"
// 1: "Chapter 3.4.5.1"
// 2: ".1"
// groups: undefined
// index: 22
// input: "For more information, see Chapter 3.4.5.1"


```

* matchAll:方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器
  * 和match的类似
  * 正则必须是带有g，不然会报错
  * 返回的是一个迭代器，需要自己遍历出结果
  * 可以返回捕获组，解决使用 match() 和 /g 标志不返回捕获组的问题

```js
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/gi;
var found = str.matchAll(re);

console.log(found);
// 0: "see Chapter 3.4.5.1"
// 1: "Chapter 3.4.5.1"
// 2: ".1"
// groups: undefined
// index: 22
// input: "For more information, see Chapter 3.4.5.1"
```

* search:返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1
  * str.search(regexp)
  * 如果传入一个非正则表达式对象 regexp，则会使用 new RegExp(regexp) 隐式地将其转换为正则表达式对象

* 当你想要知道字符串中是否存在某个模式（pattern）时可使用 search()
  * 类似于正则表达式的 test() 方法
* 当要了解更多匹配信息时，可使用 match()（但会更慢一些）
  * 类似于正则表达式的 exec() 方法。

```js
var str = "hey JudE";
var re = /[A-Z]/g;
var re2 = /[1]/g;
console.log(str.search(re)); // 返回 4, 第一次匹配到的是"J"
console.log(str.search(re2)); // 返回 -1 ，没找到1
```

* startsWith:是否以xxx开头 (ES6)
  * str.startsWith(searchString[, position])
  * 从position位置开始，判断字符串是否以searchString开头;  

* endsWith:是否以xxx结尾 (ES6)
  * str.endsWith(searchString[, length])
  * 在length长度内，判断字符串是否以searchString结尾;

```js
 var message = "my name is why."
    // 3.startsWith: 是否以xxx开头
    if (message.startsWith("my")) {
      console.log("message以my开头")
    }

    // 4.endsWith: 是否以xxx结束
    if (message.endsWith("why")) {
      console.log("message以why结尾")
    }
```

#### 实例方法-获取子字符串

* slice:获取子字符串(不会修改原字符串)
  * str.slice(beginIndex[, endIndex])
  * 包括beginIndex但不包括 endIndex
  * 从beginIndex处开始提取原字符串中的字符。
    * 如果 beginIndex 等于 endIndex, 返回一个空字符串
  * 在endIndex处结束提取字符串。
    * 如果省略该参数，会一直提取到字符串末尾。
  * 任一参数大于 stringName.length，则被当作 stringName.length
  * 任一参数为负数，则被看作是 strLength + endIndex
  * 任一参数为NaN，则被看作是0

```js
const str = 'The quick brown fox jumps over the lazy dog.';

console.log(str.slice(31));
// Expected output: "the lazy dog."

console.log(str.slice(4, 19));
// Expected output: "quick brown fox"

console.log(str.slice(-4));
// Expected output: "dog."

console.log(str.slice(-9, -5));
// Expected output: "lazy"
```

* substring:获取子字符串(不会修改原字符串)
  * str.substring(beginIndex[, endIndex])
  * 包括beginIndex但不包括 endIndex
  * 从beginIndex处开始提取原字符串中的字符。
    * 如果 beginIndex 等于 endIndex, 返回一个空字符串
  * 在endIndex处结束提取字符串。
    * 如果省略该参数，会一直提取到字符串末尾。
  * 任一参数大于 stringName.length，则被当作 stringName.length
  * 任一参数小于 0 或为 NaN，则被当作 0
  * 如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样

```js
var anyString = "Mozilla";

// 输出 "Moz"
console.log(anyString.substring(0,3));
console.log(anyString.substring(3,0));
console.log(anyString.substring(3,-3));
console.log(anyString.substring(3,NaN));
console.log(anyString.substring(-2,3));
console.log(anyString.substring(NaN,3));

// 输出 "lla"
console.log(anyString.substring(4,7));
console.log(anyString.substring(7,4));

// 输出 ""
console.log(anyString.substring(4,4));

// 输出 "Mozill"
console.log(anyString.substring(0,6));

// 输出 "Mozilla"
console.log(anyString.substring(0,7));
console.log(anyString.substring(0,10));
```

* substr:获取子字符串(不会修改原字符串)(MDN标记为废弃，建议不使用)
  * str.substr(start[, length])
  * start开始提取字符的位置。
    * 如果为负值，则被看作 strLength + start
  * length
    * 提取的字符数

* 开发中推荐使用slice方法。
  ![截屏2023-06-29 17.58.34](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-29%2017.58.34.png)

#### 拼接和分割字符串

* concat 拼接字符串(不建议使用)
  * str.concat(str2, [, ...strN])
  * 参数不是字符串类型，它们在连接之前将会被转换成字符串。
  * 不影响原字符串
  * MDN强烈建议使用赋值操作符 (en-US)（+, +=）代替 concat 方法。性能更好

```js
let hello = 'Hello, '
console.log(hello.concat('Kevin', '. Have a nice day.'))
// Hello, Kevin. Have a nice day.

let greetList = ['Hello', ' ', 'Venkat', '!']
"".concat(...greetList)  // "Hello Venkat!"

"".concat({})    // [object Object]
"".concat([])    // ""
"".concat(null)  // "null"
"".concat(true)  // "true"
"".concat(4, 5)  // "45"
```

* split 字符串分割
  * split(separator, limit)
  * separator:描述每个分割应该发生在哪里的模式
    * 可以是undefined，字符串，正则表达式,或者自定义分割对象（带有`Symbol.split`方法）
    * 省略 separator 或传递 undefined,返回一个只包含所调用字符串数组
    * 所有不是 undefined 的值或不具有 @@split 方法的对象都被强制转换为字符串
  * limit:一个非负整数，指定数组中包含的子字符串的数量限制。
    * 如果在达到极限之前就达到了字符串的末端，那么数组包含的条目可能少于 limit。
    * 如果 limit 为 0，则返回 []

```js
//plit 查找字符串中的 0 或多个空格，并返回找到的前 3 个分割元素。
const myString = "Hello World. How are you doing?";
const splits = myString.split(" ", 3);

console.log(splits);//["Hello", "World.", "How"]



//使用正则表达式
const myString = "Hello 1 word. Sentence number 2.";
const splits = myString.split(/\d/);

console.log(splits);//["Hello ", " word. Sentence number ", "."]



//如果正则表达式包含捕获括号 ( )，则其匹配结果将会包含在返回的数组中。
const myString = "Hello 1 word. Sentence number 2.";
const splits = myString.split(/(\d)/);

console.log(splits);//// [ "Hello ", "1", " word. Sentence number ", "2", "." ]


//自定义分割对象
const myString = "Hello 1 word. Sentence number 2.";
const MyObj = {
  [Symbol.split](str){
    let res = ""
    for(let p in str){
      if(str[p] !== " "){
        res+=str[p]
      }
    }
    return res
  }
}

console.log(myString.split(MyObj));//"Hello1word.Sentencenumber2."

```

备注： "".split("") 是唯一一种字符串作为 separator 参数传入的生成空数组的方法。

* join 将数组(类数组)元素连接成一个字符串
  * join()
  * join(separator)
  * separator:指定一个字符串来分隔数组的每个元
    * 如果省略，数组元素用逗号（,）分隔。
    * 如果是空字符串（""），则所有元素之间都没有任何字符。
  * 如果一个元素是 undefined 或 null，它将被转换为空字符串

```js
//在稀疏数组上使用, 将空槽视为undefined，并产生额外的分隔符：
console.log([1, , 3].join()); // '1,,3'
console.log([1, undefined, 3].join()); // '1,,3' 


//可以在类数组上使用，它会读取 this 的 length 属性，然后访问每个整数索引。
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
};
console.log(Array.prototype.join.call(arrayLike));// 2,3,4


//Array.prototype.toString() 会在内部访问 join 方法，不带参数。覆盖一个数组实例的 join 也将覆盖它的 toString 行为。
let arr = [1,2,3];
arr.join =  function(){
  return ['a','b','c']
}
console.log(arr.toString());//["a", "b", "c"]


```

更多的字符串的补充内容，可以查看MDN的文档:
  <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String>

### 3.5. 数组Array使用

#### 3.5.1. 数组的创建

* 认识数组结构
  * 数组是一种特殊的对象类型;

* 创建数组
  * []
  * new Array()
* 数组基本操作
  * 获取元素
    * arr[0]
    * arr.at(0)
      * ✓ 如果 i >= 0，则与 arr[i] 完全相同。
         ✓ 对于 i 为负数的情况，它则从数组的尾部向前数。
  * 修改元素
    * `arr[0] = "abc"`

```js
    // 1.创建数组的方式
    var names = ["why", "kobe", "james", "curry"]

    var product1 = { name: "苹果", price: 10 }
    var products = [
      { name: "鼠标", price: 98 },
      { name: "键盘", price: 100 },
      { name: "西瓜", price: 20 },
      product1
    ]

    // 2.创建方式二: 类Array
    var arr1 = new Array()
    var arr2 = new Array("abc", "cba", "nba") // ["abc", "cba", "nba"]
    console.log(arr1, arr2)

    // 传入了一个数字, 它默认会当成我们要创建一个对应长度的数组
    var arr3 = new Array(5) // [empty*5]
    console.log(arr3, arr3[0])
    var arr4 = [5]

    // 3.通过索引访问元素
    console.log(names[0]) // 第一个元素
    console.log(names[names.length-1]) // 最后一个元素
    console.log(names.at(0))

    // 4.修改数组中的元素
    names[0] = "why"
    console.log(names)

    // 5.新增数组中的元素(了解)
    names[3] = "kobe"
    names[10] = "james"
    console.log(names)

    // 6.删除数组中的元素(了解)
    delete names[1]
    console.log(names)
    console.log(names[1])

```

#### 3.5.2. 新增/删除/替换元素

* 尾部:
  * push 在末端添加元素.
  * pop 从末端取出一个元素.
* 首部
  * unshift 在首端添加元素，整个其他数组元素向后移动;
  * shift 取出队列首端的一个元素，整个数组元素向前前移动;
* push/pop 方法运行的比较快，而 shift/unshift 比较慢。
* splice(start,deleteCount,item1,item2...)
  * splice 它可以做所有事情:添加，删除和替换元素
  * 从start位置开始，处理数组中的元素;
  * deleteCount:要删除元素的个数，如果为0或者负数表示不删除;
  * item1, item2, ...:在添加元素时，需要添加的元素;
  * 这个方法会修改原数组

```js
    var names = ["abc", "cba", "nba", "mba", "abcd"]

    // 1.在数组的尾部添加和删除元素
    // // push方法
    names.push("why", "kobe")
    console.log(names)
    // // pop方法
    names.pop()
    names.pop()
    console.log(names)

    // // 2.在数组的头部添加和删除元素
    // // unshift方法
    names.unshift("why", "kobe")
    console.log(names)
    // // shift方法
    names.shift()
    console.log(names)

    // 3. 在任意位置添加/删除/替换元素
    // 参数一: start, 从什么位置开始操作元素
    // 参数二: deleteCount, 删除元素的个数

    // 3.1.删除元素
    names.splice(1, 2)
    console.log(names)

    // 3.2.新增元素
    // deleteCount: 0, 后面可以添加新的元素
    names.splice(1, 0, "why", "kobe")
    console.log(names)

    // 3.3.替换元素
    names.splice(1, 2, "why", "kobe", "james")
    console.log(names)
```

### .1. length属性

* 当我们修改数组的时候，length 属性会自动更新。
* 如果我们手动增加一个大于默认length的数值，那么会增加数组的长度。
* 但是如果我们减少它，数组就会被截断
* 所以，清空数组最简单的方法就是:`arr.length = 0;`。

```js
 var names = ["abc", "cba", "nba", "mba"]

    // 1.属性length
    // 获取数组的长度length
    console.log(names.length) // 4

    // // length属性可写的(扩容)
    names.length = 10
    console.log(names)

    // // 设置的length小于原来的元素个数
    names.length = 0
    console.log(names)

```

### .2. 数组的遍历

* 普通的for
* for in
* for of

```js
 var names = ["abc", "cba", "nba", "mba"]
    // 2.数组的遍历
    // 2.1. 普通的for循环
    for (var i = 0; i < names.length; i++) {
      console.log(names[i])
    }

    // 2.2. for..in
    for (var index in names) {
      console.log(index, names[index])
    }

    // 2.3. for..of
    for (var item of names) {
      console.log(item)
    }
```

### 4.3. 数组方法-slice-concat-join

* slice 用于对数组进行截取(类似于字符串的slice方法),不会修改原数组。
* concat 创建一个新数组，其中包含来自于其他数组和其他项的值。
* join  将一个数组的所有元素连接成一个字符串并返回这个字符串。
  * split

```js
    var names = ["abc", "cba", "nba", "mba", "why", "kobe"]

    // 1.slice方法: 不会修改原数组
    // splice有区别: splice修改原有的数组
    // start 从什么位置开始
    // end 结束位置, 不包含end本身
    var newNames = names.slice(2, 4)
    console.log(newNames)

    // 2.concat方法: 将多个数组拼接在一起
    var names1 = ["abc", "cba"]
    var names2 = ["nba", "mba"]
    var names3 = ["why", "kobe"]
    var newNames2 = names1.concat(names2, names3)
    console.log(newNames2)

    // 3.join方法: 字符串split
    console.log(names.join("-"))
```

### 4.4. 数组中查找某一个元素

* indexOf 查找某个元素的索引
  * 从fromIndex开始查找，如果找到返回对应的索引，没有找到返回-1;
  * 也有对应的从最后位置开始查找的 lastIndexOf 方法
* lastIndexOf
* find 直接查找元素或者元素的索引(ES6之后新增的语法)
  * 从索引 from 开始搜索 item，如果找到则返回 true(如果没找到，则返回 false)。
  * 回调参数：item/index/arr
* findLast 反向查找
* findIndex 回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1
* findLastIndex 反向查找
* arr.includes方法:判断数组是否包含某个元素

```js
    /*
      indexOf方式.
      手动for循环
      数组的find方法
    */

    // 1.数组中存放的是原始类型
    var names = ["abc", "cba", "nba", "mba"]

    // 1.1. indexOf
    // 可以找到, 返回对应的索引
    // 没有找到, 返回-1
    console.log(names.indexOf("nbb"))


    // 2.数组中存放的是对象类型
    var students = [
      { id: 100, name: "why", age: 18 },
      { id: 101, name: "kobe", age: 30 },
      { id: 102, name: "james", age: 25 },
      { id: 103, name: "why", age: 22 }
    ]

    // 查找的是id为101的学生信息
    // 2.1. 自己写一个for循环
    var stu = null
    for (var i = 0; i < students.length; i++) {
      if (students[i].id === 101) {
        stu = students[i]
        break
      }
    }
    // // 判断上面的算法有没有找到对应的学生
    if (stu) {
      console.log("找到了对应的101学生", stu)
    } else {
      console.log("没有找到对应的101学生")
    }

    // 2.2. find方法: 高阶函数
    var students = [
      { id: 100, name: "why", age: 18 },
      { id: 101, name: "kobe", age: 30 },
      { id: 102, name: "james", age: 25 },
      { id: 103, name: "why", age: 22 }
    ]
    
    var stu = students.find(function(item) {
      if (item.id === 101) return true
    })
    console.log(stu)



     // includes
   console.log(names.includes("nba"))

    // findIndex: 查找元素的索引
    var findIndex = names.findIndex(function(item, index, arr) {
      return item === "nba"
    })
    // var findIndex = names.findIndex(item => item === "nba")
    console.log(findIndex)
```

### 4.5. sort-reverse

* sort方法也是一个高阶函数，用于对数组进行排序，并且生成一个排序后的新数组
  * 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 前面;
  * 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变;
  * 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 前面;
  * 也就是说，谁小谁排在前面;

* reverse() 方法将数组中元素的位置颠倒，并返回该数组。

```js
 var nums = [20, 4, 10, 15, 100, 88]

    // // sort: 排序
    nums.sort(function(item1, item2) {
      // item1和item2进行比较
      // 返回是 整数
      // 谁小谁在前
      // return item1 - item2
      return item2 - item1
    })

    console.log(nums)
    console.log(nums.reverse())


    // 复杂类型的排序
    var students = [
      { id: 100, name: "why", age: 18 },
      { id: 101, name: "kobe", age: 30 },
      { id: 102, name: "james", age: 25 },
      { id: 103, name: "curry", age: 22 }
    ]

    students.sort(function(item1, item2) {
      return item1.age - item2.age
    })
    console.log(students)

```

### 46. 其他高阶函数

* arr.forEach
  * 遍历数组，并且让数组中每一个元素都执行一次对应的方法;
  * forEach(callbackFn)
  * forEach(callbackFn, thisArg)
  * callbackFn参数
    * element:数组中正在处理的当前元素。
    * index:数组中正在处理的当前元素的索引。
    * array:调用了 forEach() 的数组本身。
  * callbackFn 仅对已赋值的数组索引调用。对于稀疏数组中的空槽，它不会被调用。
  * 除非抛出异常，否则没有办法停止或中断 forEach() 循环
  * forEach() 期望的是一个同步函数，它不会等待 Promise 兑现。

```js
const array1 = ['a', 'b', 'c'];
array1.forEach((element,index,arr) => console.log(element));
// Expected output: "a"
// Expected output: "b"
// Expected output: "c"



//在稀疏数组上使用
const arraySparse = [1, 3, /* empty */, 7];
let numCallbackRuns = 0;

arraySparse.forEach((element) => {
  console.log({ element });
  numCallbackRuns++;
});

console.log({ numCallbackRuns });

// { element: 1 }
// { element: 3 }
// { element: 7 }
// { numCallbackRuns: 3 }


//forEach() 期望的是一个同步函数，它不会等待 Promise 兑现。
const ratings = [5, 4, 5];
let sum = 0;

const sumFunction = async (a, b) => a + b;

ratings.forEach(async (rating) => {
  sum = await sumFunction(sum, rating);
});

console.log(sum);
// 期望的输出：14
// 实际的输出：0



```

* arr.map
  * 这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成;
  * map(callbackFn)
  * map(callbackFn, thisArg)
  * 由于 map 创建一个新数组，在没有使用返回的数组的情况下调用它是不恰当的；应该使用 forEach 或 for...of 作为代替

```js
const numbers = [1, 4, 9];
const roots = numbers.map((num) => Math.sqrt(num));
// roots 现在是     [1, 2, 3]
// numbers 依旧是   [1, 4, 9]

//稀疏数组在使用 map() 方法后仍然是稀疏的。空槽的索引在返回的数组中仍然为空，并且回调函数不会对它们进行调用。
console.log(
  [1, , 3].map((x, index) => {
    console.log(`Visit ${index}`);
    return x * 2;
  }),
);
// Visit 0
// Visit 2
// [2, empty, 6]


//当返回 undefined 或没有返回任何内容时：
const numbers = [1, 2, 3, 4];
const filteredNumbers = numbers.map((num, index) => {
  if (index < 3) {
    return num;
  }
});

// index 从 0 开始，因此 filterNumbers 为 1、2、3 和 undefined。
// filteredNumbers 是 [1, 2, 3, undefined]
// numbers 依旧是 [1, 2, 3, 4]


//将 parseInt() 与 map() 一起使用
["1", "2", "3"].map(parseInt);
//期望输出 [1, 2, 3], 而实际结果是 [1, NaN, NaN].
//parseInt第一个参数是表达式，第二个参数是解析该表达式的基数
//map 方法会传递 3 个参数,元素,索引,数组.
//parseInt 函数会忽略第三个参数，但是不会忽略第二个参数,所以这产生一些问题
// parseInt(string, radix) -> map(parseInt(value, index))
/* 第一次迭代 (index 是 0): */ parseInt("1", 0); // 1
/* 第二次迭代 (index 是 1): */ parseInt("2", 1); // NaN
/* 第三次迭代 (index 是 2): */ parseInt("3", 2); // NaN


```

* arr.filter
  * filter() 创建给定数组一部分的浅拷贝;
  * 新数组中只包含每个元素调用函数返回为true的元素;

```js
function isBigEnough(value) {
  return value >= 10;
}

const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

* arr.some
  * 是否存在
  * 测试数组中是否至少有一个元素通过了由提供的函数实现的测试。
    * 如果在数组中找到一个元素使得提供的函数返回 true，则返回 true；
    * 否则返回 false

```js
//检测在数组中是否有元素大于 10。
function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10); // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true

//可以用来做为循环跳出控制
let arr = [1,2,3,4,5,6,7]

arr.some(item=>{

  if(item >4){
    return true;
  }
    console.log(item);
  return false;
})
// > 1
// > 2
// > 3
// > 4

```

* every
  * 是否所有都通过
  * 测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。
  * 返回false,则会停止执行。返回true则会继续执行

```js
//测试数组中的所有元素是否都大于 10。
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true


//可以用来做为循环跳出控制
let arr = [1,2,3,4,5,6,7]

arr.every(item=>{

  if(item >4){
    return false;
  }
    console.log(item);
  return true;
})
// > 1
// > 2
// > 3
// > 4


```

* arr.reduce
  * reduce(callbackFn)
  * reduce(callbackFn, initialValue)
  * 对数组中的每个元素按序执行一个由您提供的 reducer 函数;
  * 每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值;
  * callbackFn参数
    * accumulator
      * 上一次调用 callbackFn 的结果。
      * 在第一次调用时，如果指定了 initialValue 则为指定的值
      * 否则为 array[0] 的值。
    * currentValue
      * 当前元素的值。
      * 在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，
      * 否则为 array[1]。
    * currentIndex
      * currentValue 在数组中的索引位置。
      * 在第一次调用时，如果指定了 initialValue 则为 0，
      * 否则为 1。
    * array
      * 调用了 reduce() 的数组本身。
  * initialValue
    * 第一次调用回调时初始化 accumulator 的值。
    * 如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。
    * 如果没有指定 initialValue，则 accumulator 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。
    * 在这种情况下，如果数组为空（没有第一个值可以作为 accumulator 返回），则会抛出错误。
  * 边界情况
    * 如果数组只有一个元素，则将返回该单个值，而不调用 callbackFn

```js
//计算总和
let arr = [1,1,1,1]

let res = arr.reduce((sum,cur)=>{
   return sum+cur
},0)

console.log(res);//4


//计算对象的总和
const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
const sum = objects.reduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  0,
);

console.log(sum); // 6


//如果数组只有一个元素，则将返回该单个值，而不调用 callbackFn
let arr = [1]
let res = arr.reduce((sum,cur)=>{
   console.log('doing');
})

console.log(res);// 1
```

## 二. 日期Date

### 2.1. 日期的表示概念

* 人们开始制定的标准时间是英国伦敦的皇家格林威治( Greenwich )天文台的标准时间(刚好在本初子午线经过的地方)，
  * 这个时间也称之为GMT(Greenwich Mean Time)。

* 但是，根据公转有一定的误差，也会造成GMT的时间会造成一定的误差，
  * 于是就提出了根据原子钟计算的标准时间UTC(Coordinated Universal Time)

* 目前GMT依然在使用，主要表示的是某个时区中的时间，而UTC是标准的时间。

### 2.2. Date构造函数

```js
    // 创建Date对象的方式
    // 1.没有传入任何的参数, 获取到当前时间
    var date1 = new Date()
    console.log(date1)

    // 2.传入参数: 时间字符串
    var date2 = new Date("2022-08-08")
    console.log(date2)

    // 3.传入具体的年月日时分秒毫秒
    var date3 = new Date(2033, 10, 10, 09, 08, 07, 333)
    console.log(date3)

    // 4.传入一个Unix时间戳
    // 1s -> 1000ms
    var date4 = new Date(10004343433)
    console.log(date4)
```

### 2.3. 时间表示方法

* 日期的表示方式有两种:
  * RFC 2822标准
  * ISO 8601标准。

```js
    var date = new Date()
   //rfc
    console.log(date) //Fri Jun 30 2023 14:40:52 GMT+0800 (中国标准时间)
    //iso
    console.log(date.toISOString())//"2023-06-30T06:40:52.109Z"
```

* 默认打印的时间格式是RFC 2822标准的:

![截屏2023-06-29 18.11.10](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-29%2018.11.10.png)

* 我们也可以将其转化成ISO 8601标准的:

* YYYY:年份，0000 ~ 9999
* MM:月份，01 ~ 12
* DD:日，01 ~ 31
* T:分隔日期和时间，没有特殊含义，可以省略
* HH:小时，00 ~ 24
* mm:分钟，00 ~ 59
* ss:秒，00 ~ 59
* .sss:毫秒  
* Z:时区

![截屏2023-06-29 18.11.45](image/01-JavaScript%E5%9F%BA%E7%A1%80/%E6%88%AA%E5%B1%8F2023-06-29%2018.11.45.png)

### 2.4. 实例方法

#### 获取日期信息的方法

* getFullYear():获取年份(4 位数);
* getMonth():获取月份，从 0 到 11;
* getDate():获取当月的具体日期，从 1 到 31;
* getHours():获取小时;
* getMinutes():获取分钟;
* getSeconds():获取秒钟;
* getMilliseconds():获取毫秒;
* getDay():获取一周中的第几天，从 0(星期日)到 6(星期六);

#### 设置日期信息的方法

* setFullYear(year, [month], [date])
* setMonth(month, [date])
* setDate(date)
* setHours(hour, [min], [sec], [ms])
* setMinutes(min, [sec], [ms])
* setSeconds(sec, [ms])
* setMilliseconds(ms)  
* setTime(milliseconds)

我们可以设置超范围的数值，它会自动校准。

### 2.5. 获取时间戳

* Unix 时间戳:它是一个整数值，表示自1970年1月1日00:00:00 UTC以来的毫秒数。
* 在JavaScript中，我们有多种方法可以获取这个时间戳:
  * 方式一:new Date().getTime()
  * 方式二:new Date().valueOf()
  * 方式三:+new Date()
  * 方式四:Date.now()

```js
    // Date对象, 转成时间戳
    var date = new Date()
    var date2 = new Date("2033-03-03")

    // 方法一: 当前时间的时间戳
    var timestamp1 = Date.now()
    console.log(timestamp1)

    // 方法二/三将一个date对象转成时间戳
    var timestamp2 = date.getTime()
    var timestamp3 = date2.valueOf()
    console.log(timestamp2, timestamp3)

    // 方法四: 了解
    console.log(+date)
```

### 2.6. Date.parse(dateString)

* Date.parse(str) 方法可以从一个字符串中读取日期，并且输出对应的Unix时间戳。
  * 作用等同于 new Date(dateString).getTime() 操作;
  * 需要符合 RFC2822 或 ISO 8601 日期格式的字符串;
  * 比如YYYY-MM-DDTHH:mm:ss.sssZ
  * 其他格式也许也支持，但结果不能保证一定正常;  
  * 如果输入的格式不能被解析，那么会返回NaN;

```js
    var timeString = "03/23/2033"

    // 1.方式一:
    // var date = new Date(timeString)
    // var timestamp = date.getTime()

    // 2.方式二:
    var timestamp = Date.parse(timeString)
    console.log(timestamp)
```

## 额外补充 - 继承理解

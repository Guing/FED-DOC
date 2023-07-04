

## **this到底指向什么呢？**

- **我们先来看一个让人困惑的问题：**
  - 定义一个函数，我们采用三种不同的方式对它进行调用，它产生了三种不同的结果


 ![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.014.png)

- **这个的案例可以给我们什么样的启示呢？**
  - 1.函数在调用时，JavaScript会默认给this绑定一个值；
  - 2.this的绑定和定义的位置（编写的位置）没有关系； 
  - 3.this的绑定和调用方式以及调用的位置有关系； 
  - 4.this是在运行时被绑定的； 
- **那么this到底是怎么样的绑定规则呢？一起来学习一下吧** 
- 绑定一：默认绑定； 
- 绑定二：隐式绑定； 
- 绑定三：显示绑定； 
- 绑定四：new绑定； 

**规则一：默认绑定（讲过）![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **什么情况下使用默认绑定呢？独立函数调用。**
- 独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用；
- 我们通过几个案例来看一下，常见的默认绑定

` `![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.015.png) ![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.016.png)![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.017.png)

**规则二：隐式绑定（讲过）![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **另外一种比较常见的调用方式是通过某个对象进行调用的：** p也就是它的调用位置中，是通过某个对象发起的函数调用。
- 我们通过几个案例来看一下，常见的默认绑定

` `![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.018.png) ![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.019.png)![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.020.png)


**规则三：显式绑定![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **隐式绑定有一个前提条件：**
- 必须在调用的对象内部有一个对函数的引用（比如一个属性）；
- 如果没有这样的引用，在进行调用时，会报找不到该函数的错误；
- 正是通过这个引用，间接的将this绑定到了这个对象上；


- **如果我们不希望在 对象内部 包含这个函数的引用，同时又希望在这个对象上**
- **JavaScript所有的函数都可以使用call和apply方法。**
- 第一个参数是相同的，要求传入一个对象；
  - 这个对象的作用是什么呢？就是给this准备的。
  - 在调用这个函数时，会将this绑定到这个传入的对象上。
- 后面的参数，apply为数组，call为参数列表；

**进行强制调用，该怎么做呢？**


![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.021.png)

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.022.png)

- 因为上面的过程，我们明确的绑定了this指向的对象，所以称之为 **显式绑定**。

**call、apply、bind![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **通过call或者apply绑定this对象**
- 显示绑定后，this就会明确的指向绑定的对象

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.023.png)

- **如果我们希望一个函数总是显示的绑定到一个对象上，可以怎么做呢？**
- 使用bind方法，bind() 方法创建一个新的绑定函数（bound function，BF）；
- 绑定函数是一个 exotic function object（怪异函数对象，ECMAScript 2015 中的术语）
- 在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.024.png)

**内置函数的绑定思考![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **有些时候，我们会调用一些JavaScript的内置函数，或者一些第三方库中的内置函数。**
- 这些内置函数会要求我们传入另外一个函数；
- 我们自己并不会显示的调用这些函数，而且JavaScript内部或者第三方库内部会帮助我们执行；
- 这些函数中的this又是如何绑定的呢？
- **setTimeout、数组的forEach、div的点击**

` `![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.025.png)![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.026.png)

` `![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.027.png)![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.028.png)

**new绑定![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **JavaScript中的函数可以当做一个类的构造函数来使用，也就是使用new关键字。**
- **使用new关键字来调用函数是，会执行如下的操作：**
- 1.创建一个全新的对象；
- 2.这个新对象会被执行prototype连接；
- 3.这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）；
- 4.如果函数没有返回其他对象，表达式会返回这个新对象；

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.029.png)

**规则优先级![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **学习了四条规则，接下来开发中我们只需要去查找函数的调用应用了哪条规则即可，但是如果一个函数调用位置应用了多 条规则，优先级谁更高呢？**
- **1.默认规则的优先级最低** p毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this
- **2.显示绑定优先级高于隐式绑定** p代码测试
- **3.new绑定优先级高于隐式绑定** p代码测试
- **4.new绑定优先级高于bind**

pnew绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高 pnew绑定可以和bind一起使用，new绑定优先级更高

p代码测试

**this规则之外 – 忽略显示绑定![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **我们讲到的规则已经足以应付平时的开发，但是总有一些语法，超出了我们的规则之外。（神话故事和动漫中总是有类似这样的 人物）**
- **情况一：如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则：**

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.030.png)

**this规则之外 - 间接函数引用![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **情况二：创建一个函数的 间接引用，这种情况使用默认绑定规则。**
- 赋值(obj2.foo = obj1.foo)的结果是foo函数；
- foo函数被直接调用，那么是默认绑定；

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.031.png)

**箭头函数 arrow function![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **箭头函数是ES6之后增加的一种编写函数的方法，并且它比函数表达式要更加简洁：**
- 箭头函数不会绑定this、arguments属性；
- 箭头函数不能作为构造函数来使用（不能和new一起来使用，会抛出错误）；
- **箭头函数如何编写呢？**
- (): 函数的参数
- {}: 函数的执行体

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.032.png)

**箭头函数的编写优化![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **优化一: 如果只有一个参数()可以省略**

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.033.png)

- **优化二: 如果函数执行体中只有一行代码, 那么可以省略大括号**
- 并且这行代码的返回值会作为整个函数的返回值

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.034.png)

- **优化三: 如果函数执行体只有返回一个对象, 那么需要给这个对象加上()**

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.035.png)

**this规则之外 – ES6箭头函数![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **箭头函数不使用this的四种标准规则（也就是不绑定this），而是根据外层作用域来决定this。**
- **我们来看一个模拟网络请求的案例：**
- 这里我使用setTimeout来模拟网络请求，请求到数据后如何可以存放到data中呢？
- 我们需要拿到obj对象，设置data；
- 但是直接拿到的this是window，我们需要在外层定义：var \_this = this
- 在setTimeout的回调函数中使用\_this就代表了obj对象

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.036.png)

**ES6箭头函数this![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

- **之前的代码在ES6之前是我们最常用的方式，从ES6开始，我们会使用箭头函数：**
- 为什么在setTimeout的回调函数中可以直接使用this呢？
- 因为箭头函数并不绑定this对象，那么this引用就会从上层作用于中找到对应的this

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.037.png) ![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.038.png)

- **思考：如果getData也是一个箭头函数，那么setTimeout中的回调函数中的this指向谁呢？**

**面试题一：![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.039.png)

**面试题二：![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.040.png) ![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.041.png)

**面试题三：![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.042.png) ![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.043.png)

**面试题四：![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.013.png)**

![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.044.png) ![](image/Aspose.Words.038953f1-9656-43f9-94e4-2a0ded0535e8.045.png)

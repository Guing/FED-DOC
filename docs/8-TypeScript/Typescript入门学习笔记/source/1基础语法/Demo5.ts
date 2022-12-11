//函数的参数类型定义和返回值的定义


function getTotal(one: number, two: number):number {
    return one + two;
}

const total = getTotal(1, 2);

//函数无返回值时定义方法

function sayHello():void{
     console.log(123);
}


//never 返回值类型
//如果一个函数是永远也执行不完的，就可以定义返回值为never,比如无限执行或者抛出了异常，这时候就无法执行完了

function loop():never{
     while(true){}
}

function hasError():never{
    throw new Error('error');
}

//函数参数为对象(解构)时
function getAll({one,two}:{one:number,two:number}):number{
    return one +two;
}

//Enum 枚举类型讲解

//Enum的定义
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


//enum默认是从零开始的
Way.FOOT === 0  //true
Way.CAR === 1  //true
Way.FLYER === 2  //true


//可以设置开始为1，后面就会累加
enum Way1{
    FOOT = 1,
    CAR,
    FLYER
}
Way1.FOOT === 1  //true
Way1.CAR === 2  //true
Way1.FLYER === 3  //true


//通过数字可以反查enum
Way1[1] === 'FOOT' //true
Way1[2] === 'CAR'  //true
Way1[3] === 'FLYER'  //true
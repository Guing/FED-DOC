class Person {}

/**
 * 类的作用:
 *  1.可以创建类对应的实例对象
 *  2.类本身可以作为这个实例的类型
 *  3.类也可以当中有一个构造签名的函数
 */

const name: string = "aaa"
const p: Person = new Person()
function printPerson(p: Person) {}

function factory(ctor: new () => void) {}
factory(Person)

export {}

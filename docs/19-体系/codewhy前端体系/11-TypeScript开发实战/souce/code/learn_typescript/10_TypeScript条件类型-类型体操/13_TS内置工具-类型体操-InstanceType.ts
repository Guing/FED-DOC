class Person {}
class Dog {}


// 类型体操
type HYInstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R? R: never


const p1: Person = new Person()

// typeof Person: 构造函数具体的类型
// InstanceType构造函数创建出来的实例对象的类型
type HYPerson = HYInstanceType<typeof Person>
const p2: HYPerson = new Person()


// 构造函数的例子
// 通过的创建实例的工具函数时会用到这个InstanceType
function factory<T extends new (...args: any[]) => any>(ctor: T): HYInstanceType<T> {
  return new ctor()
}

const p3 = factory(Person)
const d = factory(Dog)

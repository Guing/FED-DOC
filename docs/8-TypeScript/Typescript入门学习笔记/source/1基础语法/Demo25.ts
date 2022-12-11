import 'reflect-metadata'

@Reflect.metadata('token','123456')
class Employee{
  @Reflect.metadata('token','456')
  say(){

  }
}
console.log( Reflect.getMetadata('token',new Employee(),'say'))

Reflect.hasOwnMetadata
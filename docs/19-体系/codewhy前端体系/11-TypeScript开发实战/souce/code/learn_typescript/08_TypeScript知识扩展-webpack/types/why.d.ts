declare module "lodash" {
  export function join(...args: any[]): any
}

// 为自己的 变量/函数/类 定义类型声明
declare const whyName: string
declare const whyAge: number
declare const whyHeight: number

declare function foo(bar: string): string

declare class Person {
  constructor(public name: string, public age: number)
}

// 作为一个第三方库为其他开发者提供类型声明文件 .d.ts => axios.d.ts


// 声明文件模块
declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg"

declare module "*.vue"


// 声明成模块(不合适)
// 声明命名空间
declare namespace $ {
  export function ajax(settings: any): any
}

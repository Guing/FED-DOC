import { sum } from "./utils/math"
import axios from "axios"
import type { AxiosRequestConfig, AxiosInstance } from "axios"
import React from "react"
import _ from "lodash"
import KobeImage from "./img/kobe02.png"
import App from "./vue/App.vue"

const message: string = "Hello World"
console.log(message.length, message)
console.log(sum(20, 30))

// lib.dom.d.ts
const h2El = document.createElement("h2")
h2El.textContent = "Hello TypeScript"
document.body.append(h2El)

// lib.es2015.d.ts
const promise = new Promise((resolve, reject) => {})
console.log(message.startsWith("Hello"))


// axios

// lodash
console.log(_.join(["abc", "cba"]))


// 给自己的代码添加类型声明文件
// 平时使用的代码中用到的类型, 直接在当前位置进行定义或者在业务文件夹某一个位置编写一个类型文件即可
type IDType = number | string
interface IKun {
  name: string
  age: number
  slogan: string
}

const id1: IDType = 123
// id1 = true


// 需要编写类型声明
console.log(whyName, whyAge, whyHeight)
console.log(foo("why"))

const p = new Person("kobe", 30)
console.log(p.name, p.age)


// 图片文件的使用
const imgEl = document.createElement("img")
imgEl.src = KobeImage
document.body.append(imgEl)


// jquery
$.ajax({
  url: "http://codercba.com:8000/home/multidata",
  success: function(res: any) {
    console.log(res)
  }
})

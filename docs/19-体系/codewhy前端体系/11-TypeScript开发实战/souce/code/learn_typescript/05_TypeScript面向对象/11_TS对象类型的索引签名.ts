interface ICollection {
  // 索引签名
  [index: string]: number

  length: number
}

const names: number[] = [111, 222, 333]
console.log(names[0])
console.log(names[1])
console.log(names[2])


function iteratorCollection(collection: ICollection) {
  console.log(collection[0])
  console.log(collection[1])
}

// iteratorCollection(names)
// const tuple: [string, string] = ["why", "18"]
// iteratorCollection(tuple)

iteratorCollection({ name: 111, age: 18, length: 10 })

export {}

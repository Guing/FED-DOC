package main

import "fmt"

// func main() {
// 	name, age, sex := "xiaobai", 28, 1
// 	rename, reage := say(name, age, sex)
// 	fmt.Println(rename, reage)
// }

// func say(name string, age int, sex int) (rename string, reage int) {
// 	fmt.Println(name, age, sex)
// 	return name, age
// }

// func main() {
// 	var str = "123"
// 	var str1 = "哈哈"
// 	fmt.Println(len(str + str1))
// }

// var arr1 = [3]int{1, 2, 3}
// func main() {
// 	arr := [3]int{1, 2, 3}
// 	arr[1] = 3
// 	fmt.Printf("arr: %v\n", arr)
// }

// func main() {

// 	slice := make([]int, 5)
// 	slice1 := slice[0:2]
// 	slice[0] = 1
// 	slice = append(slice, 2)
// 	fmt.Printf("arr: %v\n",  slice)
// 	fmt.Printf("arr: %v\n", slice1)
// }

// func main() {
// 	dict := make(map[string]string)
// 	dict["name"] = "xiaobai"
// 	dict["age"] = "18"
// 	value, hasData := dict["name"]
// 	fmt.Println(dict, value, hasData)
// }

// func main() {

// 	flag := 3

// 	if flag == 1 {
// 		fmt.Println("is one")
// 	} else if flag == 2 {
// 		fmt.Println("is two")
// 	} else {
// 		fmt.Println("is three")
// 	}
// }

// func main() {

// 	for i := 0; i < 10; i++ {
// 		fmt.Println(i)
// 	}

// }

// func main() {
// 	fmt.Println("a")
// 	defer fmt.Println(1)
// 	fmt.Println("b")
// 	defer fmt.Println(2)
// 	fmt.Println("c")
// 	defer fmt.Println(3)
// 	fmt.Println("d")
// 	defer fmt.Println(4)
// 	fmt.Println("e")
// }

// func main() {
// 	getError(3)
// 	fmt.Println("继续运行")

// }

// func getError(i int) {
// 	defer func() {
// 		err := recover()
// 		if err != nil {
// 			fmt.Println(err)
// 		}
// 	}()
// 	arr := [2]int{1, 2}
// 	arr[i] = 1
// }

func getFunc() func() int {
	num := 0
	return func() int {
		num += 1
		return num
	}
}
func main() {
	myFun := getFunc()
	fmt.Println(myFun())
	fmt.Println(myFun())
	fmt.Println(myFun())

	myFun1 := getFunc()
	fmt.Println(myFun1())
	fmt.Println(myFun1())
	fmt.Println(myFun1())
}

// type S struct{
// 	A struct{}
// }
// func main() {
// 	a := struct{}{}
// 	fmt.Println(unsafe.Sizeof(a))
// }

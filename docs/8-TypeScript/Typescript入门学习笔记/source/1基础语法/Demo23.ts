// interface Person {
//     name: string;
//     age: number;
//     location: string;
// }

// type K1 = keyof Person; // "name" | "age" | "location"
// let obj: K1 = 'name';
// let obj2: K1 = 'age';
// let obj3: K1 = 'location';
// //let obj4:K1 = 'test';  //报错。

// class Person {
//     name: string = "Semlinker";
//   }
  
//   let sname: keyof Person;
//   sname = "name";

function getProperty<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
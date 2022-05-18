// import  './test.js'
// console.lo(this.word);

fetch('/api/user').then(res=>{
    console.log(res.text());
})
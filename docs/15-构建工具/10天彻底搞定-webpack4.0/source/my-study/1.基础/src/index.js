require('./css/index.css');
require('./css/app.less');
import $ from 'jquery'
console.log($);
console.log(window.jquery);
let test = require('./other.js');
let arrow = ()=>{
   console.log('arrow'); 
}
arrow();
@arrow
class Test{
    constructor(){
        this.a = 'aaaaaaaaa';
    }
}
[1,2,3].includes(1);
console.log('hei');
import logo from './img/logo.jpg';
console.log(logo);
import jquery from 'jquery'
console.log(jquery);

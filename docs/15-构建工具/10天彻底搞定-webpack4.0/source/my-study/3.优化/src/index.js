import react from 'react'
import reactDom from 'react-dom'
import jquery from 'jquery'

import './hot'
if (module.hot) {
     module.hot.accept(['./hot.js'], () => {
      
     })
   }
// console.log(jquery);
// let test = ()=>{
//      console.log(aaaa);
// }
// test();

// react.Fragment()
// reactDom.findDOMNode();
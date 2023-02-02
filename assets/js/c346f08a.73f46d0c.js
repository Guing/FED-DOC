"use strict";(self.webpackChunkfed_doc=self.webpackChunkfed_doc||[]).push([[1083],{3905:function(n,e,t){t.d(e,{Zo:function(){return d},kt:function(){return m}});var a=t(67294);function l(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function r(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?r(Object(t),!0).forEach((function(e){l(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function o(n,e){if(null==n)return{};var t,a,l=function(n,e){if(null==n)return{};var t,a,l={},r=Object.keys(n);for(a=0;a<r.length;a++)t=r[a],e.indexOf(t)>=0||(l[t]=n[t]);return l}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(a=0;a<r.length;a++)t=r[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(l[t]=n[t])}return l}var s=a.createContext({}),p=function(n){var e=a.useContext(s),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},d=function(n){var e=p(n.components);return a.createElement(s.Provider,{value:e},n.children)},c={inlineCode:"code",wrapper:function(n){var e=n.children;return a.createElement(a.Fragment,{},e)}},u=a.forwardRef((function(n,e){var t=n.components,l=n.mdxType,r=n.originalType,s=n.parentName,d=o(n,["components","mdxType","originalType","parentName"]),u=p(t),m=l,f=u["".concat(s,".").concat(m)]||u[m]||c[m]||r;return t?a.createElement(f,i(i({ref:e},d),{},{components:t})):a.createElement(f,i({ref:e},d))}));function m(n,e){var t=arguments,l=e&&e.mdxType;if("string"==typeof n||l){var r=t.length,i=new Array(r);i[0]=u;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=n,o.mdxType="string"==typeof n?n:l,i[1]=o;for(var p=2;p<r;p++)i[p]=t[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},22870:function(n,e,t){t.r(e),t.d(e,{assets:function(){return d},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return c}});var a=t(87462),l=t(63366),r=(t(67294),t(3905)),i=["components"],o={},s="\u7b2c1\u7ae0",p={unversionedId:"Vue/vue3\u5165\u95e8/README",id:"Vue/vue3\u5165\u95e8/README",title:"\u7b2c1\u7ae0",description:"",source:"@site/docs/5-Vue/vue3\u5165\u95e8/README.md",sourceDirName:"5-Vue/vue3\u5165\u95e8",slug:"/Vue/vue3\u5165\u95e8/",permalink:"/FED-DOC/docs/Vue/vue3\u5165\u95e8/",editUrl:"https://github.com/Guing/FED-DOC/docs/5-Vue/vue3\u5165\u95e8/README.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u901a\u8fc7\u9ad8\u9636\u7ec4\u4ef6\u62bd\u79bbFormItem\u903b\u8f91",permalink:"/FED-DOC/docs/Vue/Vue3.0+TS\u6253\u9020\u4f01\u4e1a\u7ea7\u7ec4\u4ef6\u5e93/\u81ea\u5b9a\u4e49\u6e32\u67d3\u529f\u80fd\u96c6\u6210\u5f00\u53d1/\u901a\u8fc7\u9ad8\u9636\u7ec4\u4ef6\u62bd\u79bbFormItem\u903b\u8f91"},next:{title:"\u7b14\u8bb0",permalink:"/FED-DOC/docs/React/React17\u7cfb\u7edf\u7cbe\u8bb2\u7ed3\u5408TS\u6253\u9020\u65c5\u6e38\u7535\u5546\u5e73\u53f02021/\u7b14\u8bb0/"}},d={},c=[],u={toc:c};function m(n){var e=n.components,t=(0,l.Z)(n,i);return(0,r.kt)("wrapper",(0,a.Z)({},u,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u7b2c1\u7ae0"},"\u7b2c1\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <div class="hello">\n    <span\n      style="margin-right:10px;"\n      v-for="(item,index) in list"\n      :key="index"\n      @click="selectMethods(index)"\n    >{{item}}</span>\n    <div>\u5f53\u524d\uff1a{{currentMan}}</div>\n  </div>\n</template>\n\n<script lang="ts">\nimport { defineComponent, ref } from "vue";\n//\u4f7f\u7528setup\u65b9\u6cd5\n//\u4f7f\u7528ref\u65b9\u6cd5\n//\u4f7f\u7528ref\u5728\u65b9\u6cd5\u5185\u90e8\u4f7f\u7528\u65f6\uff0c\u9700\u8981\u7528.value\nexport default defineComponent({\n  name: "HelloWorld",\n  setup() {\n    let list = ref(["\u5c0f\u7ea2", "\u5c0f\u767d", "\u5c0f\u9ed1"]);\n    let currentMan = ref("");\n    let selectMethods = (index: number) => {\n      currentMan.value = list.value[index];\n    };\n    return {\n      list,\n      selectMethods,\n      currentMan\n    };\n  },\n});\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c2\u7ae0"},"\u7b2c2\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <div class="hello">\n    <span\n      style="margin-right:10px;"\n      v-for="(item,index) in list"\n      :key="index"\n      @click="selectMethods(index)"\n    >{{item}}</span>\n    <div>\u5f53\u524d\uff1a{{currentMan}}</div>\n  </div>\n</template>\n\n<script lang="ts">\nimport { reactive, toRefs } from "vue";\n\ninterface Data {\n  list: string[];\n  currentMan: string;\n  selectMethods(index: number): void;\n}\n\n//\u4f7f\u7528reactive\u65b9\u6cd5\n//\u4f7f\u7528...\u6269\u5c55\u8fd0\u7b97\u7b26\u4e4b\u540e,\u56e0\u4e3a\u7ed3\u6784\u540e\u5c31\u53d8\u6210\u4e86\u666e\u901a\u53d8\u91cf\uff0c\u4e0d\u518d\u5177\u6709\u54cd\u5e94\u5f0f\u7684\u80fd\u529b\n//\u5f15\u5165toRefs\u5c31\u53ef\u4ee5\u5bf9data\u8fdb\u884c\u5305\u88c5\uff0c\u628a data \u53d8\u6210refData,\u8fd9\u6837\u5c31\u53ef\u4ee5\u4f7f\u7528\u6269\u5c55\u8fd0\u7b97\u7b26\u7684\u65b9\u5f0f\u4e86\u3002\nexport default {\n  name: "HelloWorld",\n  setup() {\n    const data: Data = reactive({\n      list: ["\u5c0f\u7ea2", "\u5c0f\u767d", "\u5c0f\u9ed1"],\n      currentMan: "",\n      selectMethods: (index: number) => {\n        data.currentMan = data.list[index];\n      },\n    });\n    const refData = toRefs(data);\n    return {\n      ...refData,\n    };\n  },\n};\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c3\u7ae0"},"\u7b2c3\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <div class="hello">\n    <span\n      style="margin-right:10px;"\n      v-for="(item,index) in list"\n      :key="index"\n      @click="selectMethods(index)"\n    >{{item}}</span>\n    <div>\u5f53\u524d\uff1a{{currentMan}}</div>\n  </div>\n</template>\n\n<script lang="ts">\nimport { reactive, toRefs ,onBeforeMount } from "vue";\n\ninterface Data {\n  list: string[];\n  currentMan: string;\n  selectMethods(index: number): void;\n}\n\n// setup() :\u5f00\u59cb\u521b\u5efa\u7ec4\u4ef6\u4e4b\u524d\uff0c\u5728beforeCreate\u548ccreated\u4e4b\u524d\u6267\u884c\u3002\u521b\u5efa\u7684\u662fdata\u548cmethod\n// onBeforeMount() : \u7ec4\u4ef6\u6302\u8f7d\u5230\u8282\u70b9\u4e0a\u4e4b\u524d\u6267\u884c\u7684\u51fd\u6570\u3002\n// onMounted() : \u7ec4\u4ef6\u6302\u8f7d\u5b8c\u6210\u540e\u6267\u884c\u7684\u51fd\u6570\u3002\n// onBeforeUpdate(): \u7ec4\u4ef6\u66f4\u65b0\u4e4b\u524d\u6267\u884c\u7684\u51fd\u6570\u3002\n// onUpdated(): \u7ec4\u4ef6\u66f4\u65b0\u5b8c\u6210\u4e4b\u540e\u6267\u884c\u7684\u51fd\u6570\u3002\n// onBeforeUnmount(): \u7ec4\u4ef6\u5378\u8f7d\u4e4b\u524d\u6267\u884c\u7684\u51fd\u6570\u3002\n// onUnmounted(): \u7ec4\u4ef6\u5378\u8f7d\u5b8c\u6210\u540e\u6267\u884c\u7684\u51fd\u6570\n// onActivated(): \u88ab\u5305\u542b\u5728<keep-alive>\u4e2d\u7684\u7ec4\u4ef6\uff0c\u4f1a\u591a\u51fa\u4e24\u4e2a\u751f\u547d\u5468\u671f\u94a9\u5b50\u51fd\u6570\u3002\u88ab\u6fc0\u6d3b\u65f6\u6267\u884c\u3002\n// onDeactivated(): \u6bd4\u5982\u4ece A \u7ec4\u4ef6\uff0c\u5207\u6362\u5230 B \u7ec4\u4ef6\uff0cA \u7ec4\u4ef6\u6d88\u5931\u65f6\u6267\u884c\u3002\n// onErrorCaptured(): \u5f53\u6355\u83b7\u4e00\u4e2a\u6765\u81ea\u5b50\u5b59\u7ec4\u4ef6\u7684\u5f02\u5e38\u65f6\u6fc0\u6d3b\u94a9\u5b50\u51fd\u6570\uff08\u4ee5\u540e\u7528\u5230\u518d\u8bb2\uff0c\u4e0d\u597d\u5c55\u73b0\uff09\u3002\nexport default {\n  name: "HelloWorld",\n  setup() {\n    console.log(\'setup\');\n    const data: Data = reactive({\n      list: ["\u5c0f\u7ea2", "\u5c0f\u767d", "\u5c0f\u9ed1"],\n      currentMan: "",\n      selectMethods: (index: number) => {\n        data.currentMan = data.list[index];\n      },\n    });\n    onBeforeMount(()=>{\n       console.log(\'onBeforeMount\');\n    })\n    const refData = toRefs(data);\n    return {\n      ...refData,\n    };\n  },\n};\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c4\u7ae0"},"\u7b2c4\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <div class="hello">\n    <span\n      style="margin-right:10px;"\n      v-for="(item,index) in list"\n      :key="index"\n      @click="selectMethods(index)"\n    >{{item}}</span>\n    <div>\u5f53\u524d\uff1a{{currentMan}}</div>\n  </div>\n</template>\n\n<script lang="ts">\nimport { reactive, toRefs, onRenderTracked,onRenderTriggered } from "vue";\n\ninterface Data {\n  list: string[];\n  currentMan: string;\n  selectMethods(index: number): void;\n}\n\n//onRenderTracked\uff1a\n//\u72b6\u6001\u8ddf\u8e2a\uff0c\u5b83\u4f1a\u8ddf\u8e2a\u9875\u9762\u4e0a\u6240\u6709\u54cd\u5e94\u5f0f\u53d8\u91cf\u548c\u65b9\u6cd5\u7684\u72b6\u6001\uff0c\u4e5f\u5c31\u662f\u6211\u4eec\u7528return\u8fd4\u56de\u53bb\u7684\u503c\uff0c\u4ed6\u90fd\u4f1a\u8ddf\u8e2a\u3002\n//\u53ea\u8981\u9875\u9762\u6709update\u7684\u60c5\u51b5\uff0c\u4ed6\u5c31\u4f1a\u8ddf\u8e2a\uff0c\u7136\u540e\u751f\u6210\u4e00\u4e2aevent\u5bf9\u8c61\uff0c\u6211\u4eec\u901a\u8fc7event\u5bf9\u8c61\u6765\u67e5\u627e\u7a0b\u5e8f\u7684\u95ee\u9898\u6240\u5728\u3002\n\n//onRenderTriggered\uff1a\n//\u72b6\u6001\u89e6\u53d1\uff0c\u5b83\u4e0d\u4f1a\u8ddf\u8e2a\u6bcf\u4e00\u4e2a\u503c\uff0c\u800c\u662f\u7ed9\u4f60\u53d8\u5316\u503c\u7684\u4fe1\u606f\uff0c\u5e76\u4e14\u65b0\u503c\u548c\u65e7\u503c\u90fd\u4f1a\u7ed9\u4f60\u660e\u786e\u7684\u5c55\u793a\u51fa\u6765\u3002\nexport default {\n  name: "HelloWorld",\n  setup() {\n    console.log("setup");\n    const data: Data = reactive({\n      list: ["\u5c0f\u7ea2", "\u5c0f\u767d", "\u5c0f\u9ed1"],\n      currentMan: "",\n      selectMethods: (index: number) => {\n        data.currentMan = data.list[index];\n      },\n    });\n    // onRenderTracked((event) => {\n    //   console.log("\u72b6\u6001\u8ddf\u8e2a\u7ec4\u4ef6-----------\x3e");\n    //   console.log(event);\n    // });\n     onRenderTriggered((event) => {\n      console.log("\u72b6\u6001\u89e6\u53d1\u7ec4\u4ef6-----------\x3e");\n      console.log(event);\n    });\n    const refData = toRefs(data);\n    return {\n      ...refData,\n    };\n  },\n};\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c5\u7ae0"},"\u7b2c5\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <div class="hello">\n    <span\n      style="margin-right:10px;"\n      v-for="(item,index) in list"\n      :key="index"\n      @click="selectMethods(index)"\n    >{{item}}</span>\n    <div>\u5f53\u524d\uff1a{{currentMan}}</div>\n  </div>\n</template>\n\n<script lang="ts">\nimport { reactive, toRefs, watch } from "vue";\n\ninterface Data {\n  list: string[];\n  currentMan: string;\n  selectMethods(index: number): void;\n}\n\nexport default {\n  name: "HelloWorld",\n  setup() {\n    const data: Data = reactive({\n      list: ["\u5c0f\u7ea2", "\u5c0f\u767d", "\u5c0f\u9ed1"],\n      currentMan: "",\n      selectMethods: (index: number) => {\n        data.currentMan = data.list[index];\n      },\n    });\n    const refData = toRefs(data);\n    //export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);\n    //ref\u5bf9\u8c61\n    //\u8ba1\u7b97\u5c5e\u6027ref\u5bf9\u8c61\n    //\u8fd4\u56de\u4e00\u4e2a\u51fd\u6570\n    watch(()=>data.currentMan, (newValue, oldValue) => {\n      console.log(newValue, oldValue);\n    });\n\n    return {\n      ...refData,\n    };\n  },\n};\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c6\u7ae0"},"\u7b2c6\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <div class="hello">\n    \x3c!-- \u4f20\u9001\u95e8\u7ec4\u4ef6\uff0c\u53ef\u4ee5\u6307\u5b9a\u5728\u6302\u8f7d\u54ea\u4e2a\u5143\u7d20\u4e0b --\x3e\n     <teleport to="body">\n          <div>\n            \u6211\u5728body\u91cc\u9762\uff0c\u4e0d\u5728hello\u91cc\u9762\n          </div>\n     </teleport>\n  </div>\n</template>\n\n<script lang="ts">\n\n\nexport default {\n  name: "HelloWorld",\n\n};\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c7\u7ae0"},"\u7b2c7\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  \x3c!-- \u53ef\u4ee5\u6709\u591a\u4e2a\u6839\u5bf9\u8c61 --\x3e\n  <div class="hello">\u4e00\u4e2a\u6839</div>\n  <div class="hello">\u4e8c\u4e2a\u6839</div>\n</template>\n\n<script lang="ts">\nexport default {\n  name: "HelloWorld",\n};\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c8\u7ae0"},"\u7b2c8\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <div @click="$emit(\'my-click\',{flag:true})">\u68c0\u9a8c</div>\n</template>\n\n<script lang="ts">\nexport default {\n  name: "HelloWorld",\n  //vue3\u79fb\u9664\u4e86.native \u4fee\u9970\u7b26,\u4e3a\u4e86\u6307\u793a\u7ec4\u4ef6\u66f4\u597d\u5730\u8bc6\u522b\u81ea\u5b9a\u4e49\u4e8b\u4ef6\uff0c\u4f7f\u7528emits\n  //emits\u7684\u5b57\u7b26\u4e32\u6570\u7ec4\n  // emits:[\'my-click\']\n  //emits\u7684\u5bf9\u8c61\u5f62\u5f0f\uff0c\u53ef\u4ee5\u7528\u68c0\u9a8c\u53c2\u6570,\u9a8c\u8bc1\u51fd\u6570\u5e94\u8fd4\u56de\u5e03\u5c14\u503c\uff0c\u4ee5\u8868\u793a\u4e8b\u4ef6\u53c2\u6570\u662f\u5426\u6709\u6548\u3002\n  emits: {\n    "my-click": (payload: any) => {\n      if (payload.flag) {\n        return true;\n      } else {\n        return false;\n      }\n    },\n  },\n};\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c9\u7ae0"},"\u7b2c9\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n \n</template>\n\n<script lang="ts">\n//vue2\u4e2d\u6ca1\u6709app\u7684\u6982\u5ff5\uff0c\u4f7f\u7528Vue.config\u7b49\u5168\u5c40API\u65f6\uff0c\u4f1a\u5f71\u54cd\u6240\u6709new Vue()\u7684\u5b9e\u4f8b\n//vue3\u4e2d\u901a\u8fc7createApp()\u8fd4\u56deapp\u5b9e\u4f8b\uff0c\u5c06\u5168\u5c40API\u79fb\u9664\u6389\uff0c\u6216\u8005\u5c06\u79fb\u5230\u5b9e\u4f8bapp\u4e0b\u9762\uff0c\u8fd9\u6837\u5c31\u4e0d\u4f1a\u5f71\u54cd\u5176\u4ed6app\u5b9e\u4f8b\u4e86\u3002\n// Vue.config => app.config\n// Vue.config.productionTip => \u79fb\u9664 \n// Vue.config.ignoredElements => app.config.compilerOptions.isCustomElement \n// Vue.component  => app.component\n// Vue.directive  => app.directive\n// Vue.mixin  => app.mixin\n// Vue.use  => app.use \n// Vue.prototype  => app.config.globalProperties\n// Vue.extend  => \u79fb\u9664 \nexport default {\n  name: "HelloWorld",\n  \n\n};\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c10\u7ae0"},"\u7b2c10\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},"<template>\n \n</template>\n\n<script lang=\"ts\">\n//\u5728 Vue 3 \u4e2d\uff0c\u5168\u5c40\u548c\u5185\u90e8 API \u90fd\u7ecf\u8fc7\u4e86\u91cd\u6784\uff0c\u5e76\u8003\u8651\u5230\u4e86 tree-shaking \u7684\u652f\u6301\u3002 \n//\u6bd4\u5982nextTick\nimport { nextTick } from 'vue'\nexport default {\n  name: \"HelloWorld\",\n  created(){\n     nextTick(()=>{\n        console.log('div');\n     })\n  }\n\n};\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n")),(0,r.kt)("h1",{id:"\u7b2c11\u7ae0"},"\u7b2c11\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <div @click="updateData">{{modelValue}}</div>\n</template>\n\n<script lang="ts">\nimport { defineComponent } from "vue";\nexport default defineComponent({\n  //\u5728 Vue 2 \u4e2d,v-model\u548c.sync\u529f\u80fd\u5dee\u4e0d\u591a\uff0c\u4f46\u662f\u8bed\u6cd5\u4e0a\u4e0d\u4e00\u6837\uff0c\u5f88\u5bb9\u6613\u6df7\u6dc6\n  //\u5728 Vue3 \u4e2d\uff0cv-model\u7684prop\u548c\u4e8b\u4ef6\u9ed8\u8ba4\u540d\u79f0\u66f4\u6539\u4e3a.sync\u5f62\u5f0f\u7684\uff0c\u5e76\u4e14\u5b50\u7ec4\u4ef6\u7684model\u9009\u9879\u79fb\u9664\u3002\n  //prop\uff1avalue -> modelValue\uff1b\n  //\u4e8b\u4ef6\uff1ainput -> update:modelValue\n  //\u53ef\u4ee5\u5728\u540c\u4e00\u4e2a\u7ec4\u4ef6\u4e0a\u4f7f\u7528\u591a\u4e2a v-model \u7ed1\u5b9a\n  //\u6bd4\u5982\u60f3\u6539\u53d8prop\u540d\uff0c\u53ef\u4ee5\u901a\u8fc7\u5728\u7236\u7ec4\u4ef6\u4e0a\uff0c\u901a\u8fc7v-model:newName\uff0c\u5e76\u628a\u5b50\u7ec4\u4ef6\u4e0a\u7684\u6240\u6709modelValue\u6539\u6210newName\u5b9e\u4f8b\u3002\n  name: "HelloWorld",\n  props: ["modelValue"],\n  methods: {\n    updateData() {\n      this.$emit("update:modelValue", "world");\n    },\n  },\n});\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n')),(0,r.kt)("h1",{id:"\u7b2c12\u7ae0"},"\u7b2c12\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},"<template>\n     <renderTest>\n\n     </renderTest>\n</template>\n\n<script lang=\"ts\">\nimport { defineComponent,h } from \"vue\";\nexport default defineComponent({\n //render\u51fd\u6570\u91cc\u9762\u7684\u5c5e\u6027\u62cd\u5e73\u4e86\uff0c\u4e0d\u7528\u901a\u8fc7on:{ click:function(){} }\u3002\n //\n  name: \"HelloWorld\",\n  components:{\n    renderTest:{\n      render(){\n        return h('div',{ onClick:()=>{ alert('click'); } },'test')\n      }\n    }\n  }\n});\n<\/script>\n\n<style scoped>\nh3 {\n  margin: 40px 0 0;\n}\nul {\n  list-style-type: none;\n  padding: 0;\n}\nli {\n  display: inline-block;\n  margin: 0 10px;\n}\na {\n  color: #42b983;\n}\n</style>\n\n")),(0,r.kt)("h1",{id:"\u7b2c13\u7ae0"},"\u7b2c13\u7ae0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<template>\n  <input v-model="value" @keyup.enter="addData" />\n  <ul>\n    <li v-for="(item,index) in filterList" :key="item.id" @dblclick="item.isEdit=true">\n      <template v-if="item.isEdit">\n        <input\n          v-auto-focus="true"\n          type="text"\n          v-model="eidtValue"\n          @keyup.enter="updateData(index)"\n          @keyup.esc="cancelData(index)"\n        />\n      </template>\n      <template v-else>\n        {{item.value}}\n        <input type="checkbox" v-model="item.isCompelment" />\n        <span @click="removeData(index)">x</span>\n      </template>\n    </li>\n  </ul>\n  <div class="action-box">\n    <span @click="filterValue = \'all\'">All</span>\n    <span @click="filterValue = \'active\'">active</span>\n    <span @click="filterValue = \'compelment\'">Compelment</span>\n  </div>\n</template>\n\n<script lang="ts" >\nimport {\n  reactive,\n  toRefs,\n  defineComponent,\n  computed,\n  ComputedRef,\n  watchEffect,\n} from "vue";\ninterface IToDoItem {\n  id: number;\n  value: string;\n  isEdit: boolean;\n  isCompelment: boolean;\n}\ninterface State {\n  list: IToDoItem[];\n  filterList: ComputedRef<IToDoItem[]>;\n  value: string;\n  eidtValue: string;\n\n  filterValue: string;\n  addData: (...args: any[]) => void;\n  updateData: (index: number) => void;\n  removeData: (index: number) => void;\n  cancelData: (index: number) => void;\n  [key: string]: any;\n}\n\nlet StorageData = {\n  getData(): IToDoItem[] {\n    return JSON.parse(localStorage.getItem("todolist") || "[]") || [];\n  },\n  setData(value: IToDoItem[]) {\n    localStorage.setItem("todolist", JSON.stringify(value));\n  },\n};\n\nlet id = 1;\nexport default defineComponent({\n  setup() {\n    let state = reactive<State>({\n      list: StorageData.getData(),\n      filterList: computed<IToDoItem[]>(() => {\n        let arr: IToDoItem[] = state.list.filter((item: IToDoItem) => {\n          if (state.filterValue === "all") {\n            return true;\n          } else if (state.filterValue === "active") {\n            return !item.isCompelment;\n          } else if (state.filterValue === "compelment") {\n            return item.isCompelment;\n          }\n          return true;\n        });\n        return arr;\n      }),\n      value: "",\n      eidtValue: "",\n      filterValue: "",\n      addData: () => {\n        state.list.push({\n          id: id++,\n          isEdit: false,\n          value: state.value,\n          isCompelment: false,\n        });\n        state.value = "";\n      },\n      updateData: (index: number) => {\n        state.list[index].value = state.eidtValue;\n        state.list[index].isEdit = false;\n        return false;\n      },\n      removeData: (index: number) => {\n        state.list.splice(index, 1);\n      },\n      cancelData: (index: number) => {\n        state.list[index].isEdit = false;\n        state.eidtValue = "";\n      },\n    });\n    watchEffect(function () {\n      StorageData.setData(state.list);\n    });\n    return {\n      ...toRefs(state),\n    };\n  },\n  directives: {\n    "auto-focus": (el: HTMLElement, binding) => {\n      if (binding.value) {\n        el.focus();\n      }\n    },\n  },\n});\n<\/script>\n\n\n<style>\n.action-box span {\n  display: inline-block;\n  margin-right: 5px;\n}\n</style>\n')))}m.isMDXComponent=!0}}]);
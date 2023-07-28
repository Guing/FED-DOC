"use strict";(self.webpackChunkfed_doc=self.webpackChunkfed_doc||[]).push([[4890],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var a=t(67294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var i=a.createContext({}),s=function(e){var n=a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},u=function(e){var n=s(e.components);return a.createElement(i.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},k=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,o=e.originalType,i=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),k=s(t),m=l,g=k["".concat(i,".").concat(m)]||k[m]||c[m]||o;return t?a.createElement(g,r(r({ref:n},u),{},{components:t})):a.createElement(g,r({ref:n},u))}));function m(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var o=t.length,r=new Array(o);r[0]=k;var p={};for(var i in n)hasOwnProperty.call(n,i)&&(p[i]=n[i]);p.originalType=e,p.mdxType="string"==typeof e?e:l,r[1]=p;for(var s=2;s<o;s++)r[s]=t[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}k.displayName="MDXCreateElement"},43826:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return p},metadata:function(){return s},toc:function(){return c}});var a=t(87462),l=t(63366),o=(t(67294),t(3905)),r=["components"],p={},i=void 0,s={unversionedId:"\u4f53\u7cfb/codewhy\u524d\u7aef\u4f53\u7cfb/Webpack+Gulp+Vite+Rollup/webpack\u81ea\u5b9a\u4e49Plugin",id:"\u4f53\u7cfb/codewhy\u524d\u7aef\u4f53\u7cfb/Webpack+Gulp+Vite+Rollup/webpack\u81ea\u5b9a\u4e49Plugin",title:"webpack\u81ea\u5b9a\u4e49Plugin",description:"\u603b\u7ed3",source:"@site/docs/19-\u4f53\u7cfb/codewhy\u524d\u7aef\u4f53\u7cfb/15-Webpack+Gulp+Vite+Rollup/07_webpack\u81ea\u5b9a\u4e49Plugin.md",sourceDirName:"19-\u4f53\u7cfb/codewhy\u524d\u7aef\u4f53\u7cfb/15-Webpack+Gulp+Vite+Rollup",slug:"/\u4f53\u7cfb/codewhy\u524d\u7aef\u4f53\u7cfb/Webpack+Gulp+Vite+Rollup/webpack\u81ea\u5b9a\u4e49Plugin",permalink:"/FED-DOC/docs/\u4f53\u7cfb/codewhy\u524d\u7aef\u4f53\u7cfb/Webpack+Gulp+Vite+Rollup/webpack\u81ea\u5b9a\u4e49Plugin",editUrl:"https://github.com/Guing/FED-DOC/docs/19-\u4f53\u7cfb/codewhy\u524d\u7aef\u4f53\u7cfb/15-Webpack+Gulp+Vite+Rollup/07_webpack\u81ea\u5b9a\u4e49Plugin.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"webpack\u81ea\u5b9a\u4e49loader",permalink:"/FED-DOC/docs/\u4f53\u7cfb/codewhy\u524d\u7aef\u4f53\u7cfb/Webpack+Gulp+Vite+Rollup/webpack\u81ea\u5b9a\u4e49loader"},next:{title:"\u81ea\u52a8\u5316\u5de5\u5177gulp",permalink:"/FED-DOC/docs/\u4f53\u7cfb/codewhy\u524d\u7aef\u4f53\u7cfb/Webpack+Gulp+Vite+Rollup/\u81ea\u52a8\u5316\u5de5\u5177gulp"}},u={},c=[{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2},{value:"\u4e09. \u81ea\u5b9a\u4e49Plugin",id:"\u4e09-\u81ea\u5b9a\u4e49plugin",level:3},{value:"3.1. \u4ecb\u7ecdtapable",id:"31-\u4ecb\u7ecdtapable",level:3},{value:"3.2. Hooks\u7684\u4f7f\u7528",id:"32-hooks\u7684\u4f7f\u7528",level:3},{value:"4.1. \u81ea\u5b9a\u4e49Plugin\u539f\u7406",id:"41-\u81ea\u5b9a\u4e49plugin\u539f\u7406",level:4},{value:"4.2. \u642d\u5efa\u6ce8\u518cPlugin\u9879\u76ee",id:"42-\u642d\u5efa\u6ce8\u518cplugin\u9879\u76ee",level:4},{value:"4.3. \u81ea\u52a8\u4e0a\u4f20\u7684\u529f\u80fd\u903b\u8f91",id:"43-\u81ea\u52a8\u4e0a\u4f20\u7684\u529f\u80fd\u903b\u8f91",level:4},{value:"tapable\u4ecb\u7ecd",id:"tapable\u4ecb\u7ecd",level:2},{value:"<strong>Webpack\u548cTapable</strong>",id:"webpack\u548ctapable",level:3},{value:"<strong>Tapable\u6709\u54ea\u4e9bHook\u5462\uff1f</strong>",id:"tapable\u6709\u54ea\u4e9bhook\u5462",level:3},{value:"<strong>Tapable\u7684Hook\u5206\u7c7b</strong>",id:"tapable\u7684hook\u5206\u7c7b",level:3},{value:"<strong>Hook\u7684\u4f7f\u7528\u8fc7\u7a0b</strong>",id:"hook\u7684\u4f7f\u7528\u8fc7\u7a0b",level:3},{value:"\u540c\u6b65hook",id:"\u540c\u6b65hook",level:3},{value:"\u5f02\u6b65hook\u7684\u4f7f\u7528",id:"\u5f02\u6b65hook\u7684\u4f7f\u7528",level:3},{value:"<strong>\u81ea\u5b9a\u4e49Plugin</strong>",id:"\u81ea\u5b9a\u4e49plugin",level:2},{value:"<strong>\u5f00\u53d1\u81ea\u5df1\u7684\u63d2\u4ef6</strong>",id:"\u5f00\u53d1\u81ea\u5df1\u7684\u63d2\u4ef6",level:3},{value:"\u4f5c\u4e1a",id:"\u4f5c\u4e1a",level:2},{value:"tapable\u7684\u5e93\u5982\u4f55\u4f7f\u7528\uff1f\u6709\u54ea\u4e9b\u5173\u952e\u5b57\u4ee5\u53ca\u5b83\u4eec\u7684\u4f5c\u7528\u662f\u4ec0\u4e48\uff1f",id:"tapable\u7684\u5e93\u5982\u4f55\u4f7f\u7528\u6709\u54ea\u4e9b\u5173\u952e\u5b57\u4ee5\u53ca\u5b83\u4eec\u7684\u4f5c\u7528\u662f\u4ec0\u4e48",level:3},{value:"\u5982\u4f55\u81ea\u5b9a\u4e49Webpack\u7684\u63d2\u4ef6\uff1f\u81ea\u5b9a\u4e49\u4e00\u4e2a\u5c5e\u4e8e\u81ea\u5df1\u7684\u63d2\u4ef6\u3002",id:"\u5982\u4f55\u81ea\u5b9a\u4e49webpack\u7684\u63d2\u4ef6\u81ea\u5b9a\u4e49\u4e00\u4e2a\u5c5e\u4e8e\u81ea\u5df1\u7684\u63d2\u4ef6",level:3}],k={toc:c};function m(e){var n=e.components,p=(0,l.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},k,p,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,o.kt)("h3",{id:"\u4e09-\u81ea\u5b9a\u4e49plugin"},"\u4e09. \u81ea\u5b9a\u4e49Plugin"),(0,o.kt)("h3",{id:"31-\u4ecb\u7ecdtapable"},"3.1. \u4ecb\u7ecdtapable"),(0,o.kt)("h3",{id:"32-hooks\u7684\u4f7f\u7528"},"3.2. Hooks\u7684\u4f7f\u7528"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"synchook"),(0,o.kt)("li",{parentName:"ul"},"bail"),(0,o.kt)("li",{parentName:"ul"},"loop"),(0,o.kt)("li",{parentName:"ul"},"waterfall"),(0,o.kt)("li",{parentName:"ul"},"parallel: \u5e76\u884c"),(0,o.kt)("li",{parentName:"ul"},"series: \u4e32\u884c")),(0,o.kt)("h4",{id:"41-\u81ea\u5b9a\u4e49plugin\u539f\u7406"},"4.1. \u81ea\u5b9a\u4e49Plugin\u539f\u7406"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u56de\u987e\u6e90\u7801"),(0,o.kt)("li",{parentName:"ul"},"\u63d2\u4ef6\u7684\u6ce8\u518c"),(0,o.kt)("li",{parentName:"ul"},"compiler.hooks.xxx.tapAsync")),(0,o.kt)("h4",{id:"42-\u642d\u5efa\u6ce8\u518cplugin\u9879\u76ee"},"4.2. \u642d\u5efa\u6ce8\u518cPlugin\u9879\u76ee"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class AutoUploadWebpackPlugin {\n    apply(compiler) {}\n}\n")),(0,o.kt)("h4",{id:"43-\u81ea\u52a8\u4e0a\u4f20\u7684\u529f\u80fd\u903b\u8f91"},"4.3. \u81ea\u52a8\u4e0a\u4f20\u7684\u529f\u80fd\u903b\u8f91"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"1.\u83b7\u53d6\u6253\u5305\u540e\u7684\u6587\u4ef6\u5939"),(0,o.kt)("li",{parentName:"ul"},"2.\u8fde\u63a5\u8fdc\u7a0b\u670d\u52a1\u5668"),(0,o.kt)("li",{parentName:"ul"},"3.\u5220\u9664\u8fdc\u7a0b\u670d\u52a1\u5668\u6587\u4ef6\u4e2d\u5185\u5bb9"),(0,o.kt)("li",{parentName:"ul"},"4.\u4e0a\u4f20\u6587\u4ef6\u5939\u7684\u5185\u5bb9"),(0,o.kt)("li",{parentName:"ul"},"5.\u65ad\u5f00ssh\u8fde\u63a5")),(0,o.kt)("h2",{id:"tapable\u4ecb\u7ecd"},"tapable\u4ecb\u7ecd"),(0,o.kt)("h3",{id:"webpack\u548ctapable"},(0,o.kt)("strong",{parentName:"h3"},"Webpack\u548cTapable")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u6211\u4eec\u77e5\u9053webpack\u6709\u4e24\u4e2a\u975e\u5e38\u91cd\u8981\u7684\u7c7b\uff1aCompiler\u548cCompilation")),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"\u4ed6\u4eec\u901a\u8fc7\u6ce8\u5165\u63d2\u4ef6\u7684\u65b9\u5f0f\uff0c\u6765\u76d1\u542cwebpack\u7684\u6240\u6709\u751f\u547d\u5468\u671f\uff1b"),(0,o.kt)("li",{parentName:"ul"},"\u63d2\u4ef6\u7684\u6ce8\u5165\u79bb\u4e0d\u5f00\u5404\u79cd\u5404\u6837\u7684Hook\uff0c\u800c\u4ed6\u4eec\u7684Hook\u662f\u5982\u4f55\u5f97\u5230\u7684\u5462\uff1f"),(0,o.kt)("li",{parentName:"ul"},"\u5176\u5b9e\u662f\u521b\u5efa\u4e86Tapable\u5e93\u4e2d\u7684\u5404\u79cdHook\u7684\u5b9e\u4f8b\uff1b"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"\u6240\u4ee5\uff0c\u5982\u679c\u6211\u4eec\u60f3\u8981\u5b66\u4e60\u81ea\u5b9a\u4e49\u63d2\u4ef6\uff0c\u6700\u597d\u5148\u4e86\u89e3\u4e00\u4e2a\u5e93\uff1aTapable"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Tapable\u662f\u5b98\u65b9\u7f16\u5199\u548c\u7ef4\u62a4\u7684\u4e00\u4e2a\u5e93\uff1b"),(0,o.kt)("li",{parentName:"ul"},"Tapable\u662f\u7ba1\u7406\u7740\u9700\u8981\u7684Hook\uff0c\u8fd9\u4e9bHook\u53ef\u4ee5\u88ab\u5e94\u7528\u5230\u6211\u4eec\u7684\u63d2\u4ef6\u4e2d\uff1b")))),(0,o.kt)("h3",{id:"tapable\u6709\u54ea\u4e9bhook\u5462"},(0,o.kt)("strong",{parentName:"h3"},"Tapable\u6709\u54ea\u4e9bHook\u5462\uff1f")),(0,o.kt)("p",null,(0,o.kt)("img",{src:t(38273).Z,width:"1129",height:"534"})),(0,o.kt)("h3",{id:"tapable\u7684hook\u5206\u7c7b"},(0,o.kt)("strong",{parentName:"h3"},"Tapable\u7684Hook\u5206\u7c7b")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"\u540c\u6b65\u548c\u5f02\u6b65\u7684\uff1a"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"\u4ee5sync\u5f00\u5934\u7684\uff0c\u662f\u540c\u6b65\u7684Hook\uff1b")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"\u4ee5async\u5f00\u5934\u7684\uff0c\u4e24\u4e2a\u4e8b\u4ef6\u5904\u7406\u56de\u8c03\uff0c\u4e0d\u4f1a\u7b49\u5f85\u4e0a\u4e00\u6b21\u5904\u7406\u56de\u8c03\u7ed3\u675f\u540e\u518d\u6267\u884c\u4e0b\u4e00\u6b21\u56de\u8c03\uff1b")))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"\u5176\u4ed6\u7684\u7c7b\u522b"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"bail\uff1a\u5f53\u6709\u8fd4\u56de\u503c\u65f6\uff0c\u5c31\u4e0d\u4f1a\u6267\u884c\u540e\u7eed\u7684\u4e8b\u4ef6\u89e6\u53d1\u4e86\uff1b")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Loop\uff1a\u5f53\u8fd4\u56de\u503c\u4e3atrue\uff0c\u5c31\u4f1a\u53cd\u590d\u6267\u884c\u8be5\u4e8b\u4ef6\uff0c\u5f53\u8fd4\u56de\u503c\u4e3aundefined\u6216\u8005\u4e0d\u8fd4\u56de\u5185\u5bb9\uff0c\u5c31\u9000\u51fa\u4e8b\u4ef6\uff1b")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Waterfall\uff1a\u5f53\u8fd4\u56de\u503c\u4e0d\u4e3aundefined\u65f6\uff0c\u4f1a\u5c06\u8fd9\u6b21\u8fd4\u56de\u7684\u7ed3\u679c\u4f5c\u4e3a\u4e0b\u6b21\u4e8b\u4ef6\u7684\u7b2c\u4e00\u4e2a\u53c2\u6570\uff1b")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Parallel\uff1a\u5e76\u884c\uff0c\u4e0d\u4f1a\u7b49\u5230\u4e0a\u4e00\u4e2a\u4e8b\u4ef6\u5904\u7406\u56de\u8c03\u7ed3\u675f\uff0c\u624d\u6267\u884c\u4e0b\u4e00\u6b21\u4e8b\u4ef6\u5904\u7406\u56de\u8c03\uff1b")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Series\uff1a\u4e32\u884c\uff0c\u4f1a\u7b49\u5f85\u4e0a\u4e00\u662f\u5f02\u6b65\u7684Hook\uff1b"))))),(0,o.kt)("h3",{id:"hook\u7684\u4f7f\u7528\u8fc7\u7a0b"},(0,o.kt)("strong",{parentName:"h3"},"Hook\u7684\u4f7f\u7528\u8fc7\u7a0b")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u7b2c\u4e00\u6b65\uff1a\u521b\u5efaHook\u5bf9\u8c61")),(0,o.kt)("p",null,(0,o.kt)("img",{src:t(99449).Z,width:"572",height:"84"})),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u7b2c\u4e8c\u6b65\uff1a\u6ce8\u518cHook\u4e2d\u7684\u4e8b\u4ef6")),(0,o.kt)("p",null,(0,o.kt)("img",{src:t(52913).Z,width:"487",height:"166"})),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u7b2c\u4e09\u6b65\uff1a\u89e6\u53d1\u4e8b\u4ef6")),(0,o.kt)("p",null,(0,o.kt)("img",{src:t(3457).Z,width:"487",height:"97"})),(0,o.kt)("h3",{id:"\u540c\u6b65hook"},"\u540c\u6b65hook"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"sync\u57fa\u672c\u4f7f\u7528")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const { SyncHook } = require(\'tapable\')\n\nclass HYCompiler {\n  constructor() {\n    this.hooks = {\n      // 1.\u521b\u5efahooks\n      syncHook: new SyncHook(["name", "age"])\n    }\n\n\n    // 2.\u7528hooks\u76d1\u542c\u4e8b\u4ef6(\u81ea\u5b9a\u4e49plugin)\n    this.hooks.syncHook.tap("event1", (name, age) => {\n      console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n    })\n    \n    this.hooks.syncHook.tap("event2", (name, age) => {\n      console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n    })\n  }\n}\n\nconst compiler = new HYCompiler()\n// 3.\u53d1\u51fa\u53bb\u4e8b\u4ef6\nsetTimeout(() => {\n  compiler.hooks.syncHook.call("why", 18)\n}, 2000);\n')),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"sync_Bail\u4f7f\u7528")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const { SyncBailHook } = require(\'tapable\')\n\nclass HYCompiler {\n  constructor() {\n    this.hooks = {\n      // 1.\u521b\u5efahooks\n      // bail\u7684\u7279\u70b9: \u5982\u679c\u6709\u8fd4\u56de\u503c, \u90a3\u4e48\u53ef\u4ee5\u963b\u65ad\u540e\u7eed\u4e8b\u4ef6\u7ee7\u7eed\u6267\u884c\n      bailHook: new SyncBailHook(["name", "age"])\n    }\n\n\n    // 2.\u7528hooks\u76d1\u542c\u4e8b\u4ef6(\u81ea\u5b9a\u4e49plugin)\n    this.hooks.bailHook.tap("event1", (name, age) => {\n      console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n      return 123\n    })\n    \n    this.hooks.bailHook.tap("event2", (name, age) => {\n      console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n    })\n  }\n}\n\nconst compiler = new HYCompiler()\n// 3.\u53d1\u51fa\u53bb\u4e8b\u4ef6\nsetTimeout(() => {\n  compiler.hooks.bailHook.call("why", 18)\n}, 2000);\n\n')),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"sync_loop\u7684\u4f7f\u7528")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const { SyncLoopHook } = require(\'tapable\')\n\nlet count = 0\n\nclass HYCompiler {\n  constructor() {\n    this.hooks = {\n      // 1.\u521b\u5efahooks\n      // bail\u7684\u7279\u70b9: \u5982\u679c\u6709\u8fd4\u56de\u503c, \u90a3\u4e48\u53ef\u4ee5\u963b\u65ad\u540e\u7eed\u4e8b\u4ef6\u7ee7\u7eed\u6267\u884c\n      loopHook: new SyncLoopHook(["name", "age"])\n    }\n\n\n    // 2.\u7528hooks\u76d1\u542c\u4e8b\u4ef6(\u81ea\u5b9a\u4e49plugin)\n    this.hooks.loopHook.tap("event1", (name, age) => {\n      if (count < 5) {\n        console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n        count++\n        return true\n      }\n    })\n    \n    this.hooks.loopHook.tap("event2", (name, age) => {\n      console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n    })\n  }\n}\n\nconst compiler = new HYCompiler()\n// 3.\u53d1\u51fa\u53bb\u4e8b\u4ef6\nsetTimeout(() => {\n  compiler.hooks.loopHook.call("why", 18)\n}, 2000);\n\n')),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"sync_waterfal\u7684\u4f7f\u7528")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const { SyncWaterfallHook } = require(\'tapable\')\n\nclass HYCompiler {\n  constructor() {\n    this.hooks = {\n      // 1.\u521b\u5efahooks\n      waterfallHook: new SyncWaterfallHook(["name", "age"])\n    }\n\n\n    // 2.\u7528hooks\u76d1\u542c\u4e8b\u4ef6(\u81ea\u5b9a\u4e49plugin)\n    this.hooks.waterfallHook.tap("event1", (name, age) => {\n      console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n      \n      return {xx: "xx", yy: "yy"} //\u5f53\u8fd4\u56de\u503c\u4e0d\u4e3aundefined\u65f6\uff0c\u4f1a\u5c06\u8fd9\u6b21\u8fd4\u56de\u7684\u7ed3\u679c\u4f5c\u4e3a\u4e0b\u6b21\u4e8b\u4ef6\u7684\u7b2c\u4e00\u4e2a\u53c2\u6570\n    })\n    \n    this.hooks.waterfallHook.tap("event2", (name, age) => {\n      console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n    })\n  }\n}\n\nconst compiler = new HYCompiler()\n// 3.\u53d1\u51fa\u53bb\u4e8b\u4ef6\nsetTimeout(() => {\n  compiler.hooks.waterfallHook.call("why", 18)\n}, 2000);\n\n')),(0,o.kt)("h3",{id:"\u5f02\u6b65hook\u7684\u4f7f\u7528"},"\u5f02\u6b65hook\u7684\u4f7f\u7528"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u5f02\u6b65hook\u8981\u4f7f\u7528tapAsync\u76d1\u542c,callAsync\u89e6\u53d1"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"async_paralle\u7684\u4f7f\u7528"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const { AsyncParallelHook } = require(\'tapable\')\n\nclass HYCompiler {\n  constructor() {\n    this.hooks = {\n      // 1.\u521b\u5efahooks\n      parallelHook: new AsyncParallelHook(["name", "age"])\n    }\n\n\n    // 2.\u7528hooks\u76d1\u542c\u4e8b\u4ef6(\u81ea\u5b9a\u4e49plugin)\n    this.hooks.parallelHook.tapAsync("event1", (name, age) => {\n      setTimeout(() => {\n        console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n      }, 3000);\n    })\n   //\u4e24\u4e2a\u5e76\u884c\u6267\u884c\n    this.hooks.parallelHook.tapAsync("event2", (name, age) => {\n      setTimeout(() => {\n        console.log("event2\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n      }, 3000);\n    })\n  }\n}\n\nconst compiler = new HYCompiler()\n// 3.\u53d1\u51fa\u53bb\u4e8b\u4ef6\nsetTimeout(() => {\n  compiler.hooks.parallelHook.callAsync("why", 18)\n}, 0);\n\n')),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"async_series\u7684\u4f7f\u7528")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const { AsyncSeriesHook } = require(\'tapable\')\n\nclass HYCompiler {\n  constructor() {\n    this.hooks = {\n      // 1.\u521b\u5efahooks\n      // bail\u7684\u7279\u70b9: \u5982\u679c\u6709\u8fd4\u56de\u503c, \u90a3\u4e48\u53ef\u4ee5\u963b\u65ad\u540e\u7eed\u4e8b\u4ef6\u7ee7\u7eed\u6267\u884c\n      seriesHook: new AsyncSeriesHook(["name", "age"])\n    }\n\n\n    // 2.\u7528hooks\u76d1\u542c\u4e8b\u4ef6(\u81ea\u5b9a\u4e49plugin)\n    //\u4e24\u4e2a\u4e32\u884c\u6267\u884c\uff0c\u53ea\u6709\u7b49\u5230\u4e0a\u4e00\u4e2aasync hook\u6709\u7ed3\u679c\u4e4b\u540e\uff0c\u624d\u4f1a\u6267\u884c\u4e0b\u4e00\u4e2a\u3002\n    this.hooks.seriesHook.tapAsync("event1", (name, age, callback) => {\n      setTimeout(() => {\n        console.log("event1\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n        callback()\n      }, 3000);\n    })\n\n    this.hooks.seriesHook.tapAsync("event2", (name, age, callback) => {\n      setTimeout(() => {\n        console.log("event2\u4e8b\u4ef6\u76d1\u542c\u6267\u884c\u4e86:", name, age)\n        callback()\n      }, 3000);\n    })\n  }\n}\n\nconst compiler = new HYCompiler()\n// 3.\u53d1\u51fa\u53bb\u4e8b\u4ef6\nsetTimeout(() => {\n  compiler.hooks.seriesHook.callAsync("why", 18, () => {\n    console.log("\u6240\u6709\u4efb\u52a1\u90fd\u6267\u884c\u5b8c\u6210~")\n  })\n}, 0);\n\n')),(0,o.kt)("h2",{id:"\u81ea\u5b9a\u4e49plugin"},(0,o.kt)("strong",{parentName:"h2"},"\u81ea\u5b9a\u4e49Plugin")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u5728\u4e4b\u524d\u7684\u5b66\u4e60\u4e2d\uff0c\u6211\u4eec\u5df2\u7ecf\u4f7f\u7528\u4e86\u975e\u5e38\u591a\u7684Plugin\uff1a",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"CleanWebpackPlugin"),(0,o.kt)("li",{parentName:"ul"},"HTMLWebpackPlugin"),(0,o.kt)("li",{parentName:"ul"},"MiniCSSExtractPlugin"),(0,o.kt)("li",{parentName:"ul"},"CompressionPlugin"),(0,o.kt)("li",{parentName:"ul"},"\u7b49\u7b49\u3002\u3002\u3002")))),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"\u8fd9\u4e9bPlugin\u662f\u5982\u4f55\u88ab\u6ce8\u518c\u5230webpack\u7684\u751f\u547d\u5468\u671f\u4e2d\u7684\u5462\uff1f"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"\u7b2c\u4e00\uff1a\u5728webpack\u51fd\u6570\u7684createCompiler\u65b9\u6cd5\u4e2d\uff0c\u6ce8\u518c\u4e86\u6240\u6709\u7684\u63d2\u4ef6\uff1b"),(0,o.kt)("li",{parentName:"ul"},"\u7b2c\u4e8c\uff1a\u5728\u6ce8\u518c\u63d2\u4ef6\u65f6\uff0c\u4f1a\u8c03\u7528\u63d2\u4ef6\u51fd\u6570\u6216\u8005\u63d2\u4ef6\u5bf9\u8c61\u7684apply\u65b9\u6cd5\uff1b"),(0,o.kt)("li",{parentName:"ul"},"\u7b2c\u4e09\uff1a\u63d2\u4ef6\u65b9\u6cd5\u4f1a\u63a5\u6536compiler\u5bf9\u8c61\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7compiler\u5bf9\u8c61\u6765\u6ce8\u518cHook\u7684\u4e8b\u4ef6\uff1b"),(0,o.kt)("li",{parentName:"ul"},"\u7b2c\u56db\uff1a\u67d0\u4e9b\u63d2\u4ef6\u4e5f\u4f1a\u4f20\u5165\u4e00\u4e2acompilation\u7684\u5bf9\u8c61\uff0c\u6211\u4eec\u4e5f\u53ef\u4ee5\u76d1\u542ccompilation\u7684Hook\u4e8b\u4ef6\uff1b")))),(0,o.kt)("h3",{id:"\u5f00\u53d1\u81ea\u5df1\u7684\u63d2\u4ef6"},(0,o.kt)("strong",{parentName:"h3"},"\u5f00\u53d1\u81ea\u5df1\u7684\u63d2\u4ef6")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u5982\u4f55\u5f00\u53d1\u81ea\u5df1\u7684\u63d2\u4ef6\u5462\uff1f")),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"\u76ee\u524d\u5927\u90e8\u5206\u63d2\u4ef6\u90fd\u53ef\u4ee5\u5728\u793e\u533a\u4e2d\u627e\u5230\uff0c\u4f46\u662f\u63a8\u8350\u5c3d\u91cf\u4f7f\u7528\u5728\u7ef4\u62a4\uff0c\u5e76\u4e14\u7ecf\u8fc7\u793e\u533a\u9a8c\u8bc1\u7684\uff1b"),(0,o.kt)("li",{parentName:"ul"},"\u8fd9\u91cc\u6211\u4eec\u5f00\u53d1\u4e00\u4e2a\u81ea\u5df1\u7684\u63d2\u4ef6\uff1a\u5c06\u9759\u6001\u6587\u4ef6\u81ea\u52a8\u4e0a\u4f20\u670d\u52a1\u5668\u4e2d\uff1b"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u81ea\u5b9a\u4e49\u63d2\u4ef6\u7684\u8fc7\u7a0b\uff1a")),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"\u521b\u5efaAutoUploadWebpackPlugin\u7c7b\uff1b")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"\u7f16\u5199apply\u65b9\u6cd5\uff1a"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"\u901a\u8fc7ssh\u8fde\u63a5\u670d\u52a1\u5668\uff1b"),(0,o.kt)("li",{parentName:"ul"},"\u5220\u9664\u670d\u52a1\u5668\u539f\u6765\u7684\u6587\u4ef6\u5939\uff1b"),(0,o.kt)("li",{parentName:"ul"},"\u4e0a\u4f20\u6587\u4ef6\u5939\u4e2d\u7684\u5185\u5bb9\uff1b"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"\u5728webpack\u7684plugins\u4e2d\uff0c\u4f7f\u7528AutoUploadWebpackPlugin\u7c7b\uff1b"))))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { NodeSSH } = require('node-ssh')\nconst { PASSWORD } = require('./config')\n\nclass AutoUploadWebpackPlugin {\n  constructor(options) {\n    this.ssh = new NodeSSH()\n    this.options = options\n  }\n\n  apply(compiler) {\n    // console.log(\"AutoUploadWebpackPlugin\u88ab\u6ce8\u518c:\")\n    // \u5b8c\u6210\u7684\u4e8b\u60c5: \u6ce8\u518chooks\u76d1\u542c\u4e8b\u4ef6\n    // \u7b49\u5230assets\u5df2\u7ecf\u8f93\u51fa\u5230output\u76ee\u5f55\u4e0a\u65f6, \u5b8c\u6210\u81ea\u52a8\u4e0a\u4f20\u7684\u529f\u80fd\n    compiler.hooks.afterEmit.tapAsync(\"AutoPlugin\", async (compilation, callback) => {\n      // 1.\u83b7\u53d6\u8f93\u51fa\u6587\u4ef6\u5939\u8def\u5f84(\u5176\u4e2d\u8d44\u6e90)\n      const outputPath = compilation.outputOptions.path\n\n      // 2.\u8fde\u63a5\u8fdc\u7a0b\u670d\u52a1\u5668 SSH\n      await this.connectServer()\n\n      // 3.\u5220\u9664\u539f\u6709\u7684\u6587\u4ef6\u5939\u4e2d\u5185\u5bb9\n      const remotePath = this.options.remotePath\n      this.ssh.execCommand(`rm -rf ${remotePath}/*`)\n\n      // 4.\u5c06\u6587\u4ef6\u5939\u4e2d\u8d44\u6e90\u4e0a\u4f20\u5230\u670d\u52a1\u5668\u4e2d\n      await this.uploadFiles(outputPath, remotePath)\n\n      // 5.\u5173\u95edssh\u8fde\u63a5\n      this.ssh.dispose()\n\n      // \u5b8c\u6210\u6240\u6709\u7684\u64cd\u4f5c\u540e, \u8c03\u7528callback()\n      callback()\n    })\n  }\n\n  async connectServer() {\n    await this.ssh.connect({\n      host: this.options.host,\n      username: this.options.username,\n      password: this.options.password\n    })\n    console.log('\u670d\u52a1\u5668\u8fde\u63a5\u6210\u529f')\n  }\n\n  async uploadFiles(localPath, remotePath) {\n    const status = await this.ssh.putDirectory(localPath, remotePath, {\n      recursive: true,\n      concurrency: 10\n    })\n    if (status) {\n      console.log(\"\u6587\u4ef6\u4e0a\u4f20\u670d\u52a1\u5668\u6210\u529f~\")\n    }\n  }\n}\n\nmodule.exports = AutoUploadWebpackPlugin\nmodule.exports.AutoUploadWebpackPlugin = AutoUploadWebpackPlugin\n\n")),(0,o.kt)("h2",{id:"\u4f5c\u4e1a"},"\u4f5c\u4e1a"),(0,o.kt)("h3",{id:"tapable\u7684\u5e93\u5982\u4f55\u4f7f\u7528\u6709\u54ea\u4e9b\u5173\u952e\u5b57\u4ee5\u53ca\u5b83\u4eec\u7684\u4f5c\u7528\u662f\u4ec0\u4e48"},"tapable\u7684\u5e93\u5982\u4f55\u4f7f\u7528\uff1f\u6709\u54ea\u4e9b\u5173\u952e\u5b57\u4ee5\u53ca\u5b83\u4eec\u7684\u4f5c\u7528\u662f\u4ec0\u4e48\uff1f"),(0,o.kt)("h3",{id:"\u5982\u4f55\u81ea\u5b9a\u4e49webpack\u7684\u63d2\u4ef6\u81ea\u5b9a\u4e49\u4e00\u4e2a\u5c5e\u4e8e\u81ea\u5df1\u7684\u63d2\u4ef6"},"\u5982\u4f55\u81ea\u5b9a\u4e49Webpack\u7684\u63d2\u4ef6\uff1f\u81ea\u5b9a\u4e49\u4e00\u4e2a\u5c5e\u4e8e\u81ea\u5df1\u7684\u63d2\u4ef6\u3002"))}m.isMDXComponent=!0},38273:function(e,n,t){n.Z=t.p+"assets/images/Aspose.Words.44c7b2d6-cb8c-4ad5-87dd-3efb2ad0e9bd.014-9e3c025b218f39b731b48e4bd05954eb.jpeg"},99449:function(e,n,t){n.Z=t.p+"assets/images/Aspose.Words.44c7b2d6-cb8c-4ad5-87dd-3efb2ad0e9bd.015-a9c403f8a7d78b6cf420e9551d54020b.png"},52913:function(e,n,t){n.Z=t.p+"assets/images/Aspose.Words.44c7b2d6-cb8c-4ad5-87dd-3efb2ad0e9bd.016-9cfd786a22e843fd11e965b2de6b57cb.png"},3457:function(e,n,t){n.Z=t.p+"assets/images/Aspose.Words.44c7b2d6-cb8c-4ad5-87dd-3efb2ad0e9bd.017-a7c9b3876c066af8295a34163a097a9a.png"}}]);
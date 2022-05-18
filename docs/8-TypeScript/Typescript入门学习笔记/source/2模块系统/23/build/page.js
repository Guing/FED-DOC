"use strict";
var Components;
(function (Components) {
    var Header = /** @class */ (function () {
        function Header() {
            var dom = document.createElement('div');
            dom.innerText = 'header';
            document.body.appendChild(dom);
        }
        return Header;
    }());
    Components.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var dom = document.createElement('div');
            dom.innerText = 'Content';
            document.body.appendChild(dom);
        }
        return Content;
    }());
    Components.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var dom = document.createElement('div');
            dom.innerText = 'Footer';
            document.body.appendChild(dom);
        }
        return Footer;
    }());
    Components.Footer = Footer;
})(Components || (Components = {}));
// 初识命名空间-Namespace
//将组件抽离到单独文件
var Home;
(function (Home) {
    //只暴露Page类
    var Page = /** @class */ (function () {
        function Page() {
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
//编译的时候，会生成page.js,components.js两个文件,需要在index.html中引入components.js
//可以更改tsconfig.json中的配置，使生成一个文件
//outFile
//这个就是用来生成一个文件的设置，但是如果设置了它，就不再支持"module":"commonjs"设置了，我们需要把它改成"module":"amd"

"use strict";
var Home;
(function (Home) {
    var Header = /** @class */ (function () {
        function Header() {
            var dom = document.createElement('div');
            dom.innerText = 'header';
            document.body.appendChild(dom);
        }
        return Header;
    }());
    var Content = /** @class */ (function () {
        function Content() {
            var dom = document.createElement('div');
            dom.innerText = 'Content';
            document.body.appendChild(dom);
        }
        return Content;
    }());
    var Footer = /** @class */ (function () {
        function Footer() {
            var dom = document.createElement('div');
            dom.innerText = 'Footer';
            document.body.appendChild(dom);
        }
        return Footer;
    }());
    //只暴露Page类
    var Page = /** @class */ (function () {
        function Page() {
            new Header();
            new Content();
            new Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));

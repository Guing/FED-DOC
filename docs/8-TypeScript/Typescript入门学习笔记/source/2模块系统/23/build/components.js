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

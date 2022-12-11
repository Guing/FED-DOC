"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
var index_1 = require("../utils/index");
var decorator_1 = require("../decorator/");
var homePageHtml = "\n<html>\n<body>\n <a  href=\"/showData\" >\u5C55\u793A\u6570\u636E</a>\n <a  href=\"/logout\" >\u9000\u51FA\u767B\u5F55</a>\n</body>\n</html>\n";
var loginPageHtml = "\n<html>\n<body>\n  <form method=\"post\" action=\"/login\">\n    <input type=\"password\" name=\"password\" />\n    <button>\u767B\u9646</button>\n  </form>\n</body>\n</html>\n";
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.home = function (req, res, next) {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.isLogin) {
            res.send(homePageHtml);
        }
        else {
            res.send(loginPageHtml);
        }
    };
    LoginController.prototype.login = function (req, res) {
        var _a, _b;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.isLogin) {
            res.json((0, index_1.getResponseData)(false, '已经登录过'));
        }
        else {
            if (((_b = req.body) === null || _b === void 0 ? void 0 : _b.password) === '123456' && req.session) {
                req.session.isLogin = true;
                res.json((0, index_1.getResponseData)(true));
            }
            else {
                res.json((0, index_1.getResponseData)(false, '登录失败'));
            }
        }
    };
    LoginController.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.isLogin = undefined;
        }
        res.json((0, index_1.getResponseData)(true));
    };
    __decorate([
        (0, decorator_1.get)('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    __decorate([
        (0, decorator_1.post)('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        (0, decorator_1.get)('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    LoginController = __decorate([
        (0, decorator_1.controller)('/')
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;

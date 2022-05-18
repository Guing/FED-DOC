"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("./utils/index");
var Data = __importStar(require("./utils/data.json"));
var router = (0, express_1.Router)();
var homePageHtml = "\n<html>\n<body>\n <a  href=\"/showData\" >\u5C55\u793A\u6570\u636E</a>\n <a  href=\"/logout\" >\u9000\u51FA\u767B\u5F55</a>\n</body>\n</html>\n";
var loginPageHtml = "\n<html>\n<body>\n  <form method=\"post\" action=\"/login\">\n    <input type=\"password\" name=\"password\" />\n    <button>\u767B\u9646</button>\n  </form>\n</body>\n</html>\n";
router.get('/', function (req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.isLogin) {
        res.send(homePageHtml);
    }
    else {
        res.send(loginPageHtml);
    }
});
router.post('/login', function (req, res) {
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
});
router.get('/logout', index_1.checkLogin, function (req, res) {
    if (req.session) {
        req.session.isLogin = undefined;
    }
    res.json((0, index_1.getResponseData)(true));
});
router.get('/showData', index_1.checkLogin, function (req, res) {
    res.json((0, index_1.getResponseData)(Data));
});
exports.default = router;

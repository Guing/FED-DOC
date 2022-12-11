"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = exports.checkLogin = void 0;
var checkLogin = function (req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.isLogin) {
        next();
    }
    else {
        res.json((0, exports.getResponseData)(null, '请先登录'));
    }
};
exports.checkLogin = checkLogin;
var getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            data: data,
            success: false,
            errMsg: errMsg
        };
    }
    else {
        return {
            data: data,
            success: true
        };
    }
};
exports.getResponseData = getResponseData;

"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (construct) {
        for (var key in construct.prototype) {
            var pathStr = Reflect.getMetadata('path', construct.prototype, key);
            var method = Reflect.getMetadata('method', construct.prototype, key);
            var middlewares = Reflect.getMetadata('middlewares', construct.prototype, key) || [];
            if (root) {
                pathStr = root == '/' ? pathStr : root + pathStr;
            }
            if (pathStr && method) {
                router_1.default[method].apply(router_1.default, __spreadArray(__spreadArray([pathStr], middlewares, false), [construct.prototype[key]], false));
            }
        }
    };
}
exports.controller = controller;

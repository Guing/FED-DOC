"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.Methods = void 0;
require("reflect-metadata");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
})(Methods = exports.Methods || (exports.Methods = {}));
function requestMethods(methods) {
    return function (path) {
        return function (target, key, dec) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', methods, target, key);
        };
    };
}
exports.get = requestMethods(Methods.GET);
exports.post = requestMethods(Methods.POST);

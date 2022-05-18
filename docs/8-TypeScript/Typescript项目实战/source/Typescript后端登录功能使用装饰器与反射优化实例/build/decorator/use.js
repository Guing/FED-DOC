"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(middleware) {
    return function (target, key, dec) {
        var middlewares = Reflect.getMetadata('middlewares', target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata('middlewares', middlewares, target, key);
    };
}
exports.use = use;

import {  RequestHandler} from 'express'
export function use(middleware: RequestHandler) {
    return function (target: any, key: string, dec: PropertyDescriptor) {
        let middlewares = Reflect.getMetadata('middlewares', target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata('middlewares', middlewares, target, key);
    }
}
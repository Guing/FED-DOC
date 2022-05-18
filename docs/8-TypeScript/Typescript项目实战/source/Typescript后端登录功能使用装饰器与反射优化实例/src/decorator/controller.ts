import router from '../router';
import  { RequestHandler } from 'express'
import { Methods } from './request'

export function controller(root: string) {
    return function <T extends { new(...args: any[]): any }>(construct: T) {
        for (let key in construct.prototype) {
            let pathStr: string = Reflect.getMetadata('path', construct.prototype, key)
            let method: Methods = Reflect.getMetadata('method', construct.prototype, key);
            let middlewares:RequestHandler[] = Reflect.getMetadata('middlewares', construct.prototype, key) || [];
            if (root) {
                pathStr = root == '/' ? pathStr : root + pathStr
            }
            
            if (pathStr && method) {
                router[method](pathStr, ...middlewares, construct.prototype[key]);
            }
        }
    }
}

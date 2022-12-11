import 'reflect-metadata'

 export enum Methods {
    GET = 'get',
    POST = 'post'
}

function requestMethods(methods:Methods) {
    return function (path: string) {

        return function (target: any, key: string, dec: PropertyDescriptor) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', methods, target, key);
        }
    }
}

export const get = requestMethods(Methods.GET)
export const post = requestMethods(Methods.POST)

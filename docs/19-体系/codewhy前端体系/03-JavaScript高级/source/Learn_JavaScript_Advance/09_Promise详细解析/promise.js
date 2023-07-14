class myPromise {

    status = 'pedding';

    fulfilledHanders = [];
    rejectedHanders = [];
    constructor(callback) {
        callback(this.reslove.bind(this), this.reject.bind(this))
    }
    reslove(data) {
        this.status === 'pedding' && (this.status = 'fulfilled')
        this.fulfilledHanders.forEach(obj => {
            obj.result = obj.handle(data)
            obj.reslove(obj.result)
        })
    }
    reject(err) {
        this.status === 'pedding' && (this.status = 'rejected')
        this.rejectedHanders.forEach(obj => {
            obj.result = obj.handle(err)
            obj.reslove(obj.result)
        })
    }
    then(fulfilledHander, rejectedHander) {

        return new myPromise((reslove, reject) => {
            typeof fulfilledHander === 'function' && this.fulfilledHanders.push({ handle: fulfilledHander, result: null, reslove });
            typeof rejectedHander === 'function' && this.rejectedHanders.push({ handle: rejectedHander, result: null, reslove });
        })

    }
    catch(rejectedHander) {
        return new myPromise((reslove, reject) => {
            typeof rejectedHander === 'function' && this.rejectedHanders.push({ handle: rejectedHander, result: null, reslove });
        })
    }
}
let promise = new myPromise((reslove, reject) => {
    setTimeout(() => {
        // reslove('success');
        reject('reject');
    }, 2000)
})

promise.then((res) => {
    console.log('第一次success：', res);

}).then((res) => {
    console.log('第二次success：', res);
}).catch((err) => {
    console.log('第后次fail：', err);
})
// 初识命名空间-Namespace

//不使用namespace，则Header,Content，Footer,Page全部暴露到全局
//使用namespace，只暴露Page类，减少命名空间污染
//可以使用tsc -w进行监视
namespace Home {
    class Header {
        constructor() {
            let dom = document.createElement('div');
            dom.innerText = 'header';
            document.body.appendChild(dom);
        }
    }
    class Content {
        constructor() {
            let dom = document.createElement('div');
            dom.innerText = 'Content';
            document.body.appendChild(dom);
        }
    }
    class Footer {
        constructor() {
            let dom = document.createElement('div');
            dom.innerText = 'Footer';
            document.body.appendChild(dom);
        }
    }
    //只暴露Page类
    export class Page {
        constructor() {
             new Header();
             new Content();
             new Footer();
        }
    }

}
namespace Components{
    
     export class Header {
        constructor() {
            let dom = document.createElement('div');
            dom.innerText = 'header';
            document.body.appendChild(dom);
        }
    }
    export class Content {
        constructor() {
            let dom = document.createElement('div');
            dom.innerText = 'Content';
            document.body.appendChild(dom);
        }
    }
    export class Footer {
        constructor() {
            let dom = document.createElement('div');
            dom.innerText = 'Footer';
            document.body.appendChild(dom);
        }
    }
}
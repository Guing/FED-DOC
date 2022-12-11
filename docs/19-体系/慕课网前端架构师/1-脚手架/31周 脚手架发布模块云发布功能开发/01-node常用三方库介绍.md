### 五章 本周加餐：node常用三方库介绍

------

#### 5-1 Node高分库：PDF文件生成工具——PDFKit

[awesome-nodejs](https://github.com/sindresorhus/awesome-nodejs)

本节sam老师，主要是讲解了这个[pdfkit](https://github.com/foliojs/pdfkit)库。

- 创建一个nodejs项目:npm init -y
- npm install -S pdfkit
- 新建kit/index.js,官方仓库代码copy如下：

```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Embed a font, set the font size, and render some text
doc
  .font('fonts/PalatinoBold.ttf')
  .fontSize(25)
  .text('Some text with an embedded font!', 100, 100);

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('path/to/image.png', {
  fit: [250, 300],
  align: 'center',
  valign: 'center'
});

// Add another page
doc
  .addPage()
  .fontSize(25)
  .text('Here is some vector graphics...', 100, 100);

// Draw a triangle
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

// Add some text with annotations
doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');

// Finalize PDF file
doc.end();
```



#### 5-2 Node Excel处理库讲解

https://github.com/dtjohnson/xlsx-populate



#### 5-3 命令行交互库Listr讲解

- [np](https://github.com/sindresorhus/np)：Better npm publish
- np核心库：[listr](https://www.npmjs.com/package/listr)

#### 5-4 利用Listr对项目自动创建Tag逻辑进行优化

```javascript
const Listr = require('listr')
const { Observable } = require('rxjs')

const tasks = new Listr([
    {
        title:'Task1',
        task:()=>new Listr([{
            title:'Task1-1',
            task:()=>{
                return new Observable(o=>{
                    o.next('Task-1-1')
                    setTimeout(() => {
                        o.next('Task-1-1-1')
                        o.complete()
                    }, 1000);
                    
                })
            }
        }])
    },
    {
        title:'Task2',
        task:()=>{
            throw new Error('error')
    },
}
])
tasks.run()
process.on('unhandledRejection',(e)=>{
    console.log(e.message)
})
```


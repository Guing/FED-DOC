const fs = require('fs');
const path = require('path');
let dirPath = path.resolve(__dirname, 'src/components/');
let dir = fs.readdirSync(dirPath);
if (dir && dir.length > 0) {
    let reg = /^Demo(\d+).*$/
    dir.sort((a, b) => {
        let a_matchs = a.match(reg);
        let b_matchs = b.match(reg);
        return a_matchs[1] - b_matchs[1];
    })
    let strs = '# Vue入门笔记';
    dir.forEach((file, index) => {
        let str = fs.readFileSync(path.resolve(dirPath, file));
        strs +=
            `## 第${index + 1}章

\`\`\`html
${str}
\`\`\`




`
    })
    fs.writeFileSync(path.resolve(__dirname, 'README.md'), strs);
    console.log('\n写入成功！')
}

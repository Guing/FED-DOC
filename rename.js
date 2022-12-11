var fs = require('fs');
const path = require('path')

const parentPath = './docs/3-Css/尚硅谷CSS3教程'


function getFileList(parentPath) {

    const files = fs.readdirSync(parentPath)


    files && files.length > 0 && files.forEach(function (item, index) {
        let itemPath = path.join(parentPath, item)

        let stat = fs.lstatSync(itemPath)
        if (stat.isDirectory() === true) {
            getFileList(itemPath);
        }
        renameNumber(item, parentPath);
    })
}
function renameChildToParent(item, parentPath) {
    const oldPath = path.resolve(path.join(parentPath, item))
    const parentName = parentPath.substr(parentPath.lastIndexOf('\\') + 1)
    const newPath = path.resolve(path.join(parentPath, parentName + '.md'))
    rename(oldPath, newPath);
}
function renameNumber(item, parentPath) {
    const oldPath = path.resolve(path.join(parentPath, item))
    // const match = /^(?<numberPrefix>\s*(?<firstPrefix>\d+)\s*[-_.]+\s*(?<secondPrefix>\d*)\s*)(?<suffix>[^-_.\s].*)$/.exec(item);
    const match = /^((?<firstPrefix>\d+)\s*[-_.]+\s*)(?<suffix>[^-_.\s].*)$/.exec(item);
    if (match) {
        const { firstPrefix, suffix } = match.groups;
        if (firstPrefix) {
            const newPath = path.resolve(path.join(parentPath, firstPrefix + '-' + suffix));
            rename(oldPath, newPath);
        }
    }
}
function rename(oldPath, newPath) {
    const result = fs.renameSync(oldPath, newPath);

}
getFileList(parentPath);
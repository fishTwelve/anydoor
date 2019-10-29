const path = require('path')

const mimeTypes = {
    'css' : 'text/css',
    'gif' : 'image/gif',
    'html' : 'text/html',
    'ico' : 'image/x-icon',
    'jpeg' : 'image/jpeg',
    'jpg' : 'image/jpeg',
    'js' : 'text/javaScript',
    'txt' : 'text/plain'
}

module.exports = (filePath) => {
    let ext = path.extname(filePath)
        .split('.')  // 有时候拓展名为.min.js 但是只需要最后面的 .js
        .pop() // 只需要数组中的最后一个元素
        .toLowerCase() // 转小写
    if (!ext) {
        // 没有拓展名则直接取文件名或者其他随便什么也可
        ext = filePath
    }
    // console.log(mimeTypes[ext])
    return mimeTypes[ext] || mimeTypes['txt']
}

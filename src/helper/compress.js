// 引入node的压缩算法
const {createGzip, createDeflate} = require('zlib')
module.exports = (rs, req, res) => {
    // 获取浏览器支持的压缩方式
    const acceptEncoding = req.headers['accept-encoding']
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|default)\b/)) {
        return rs
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        //告知浏览器使用的压缩方式
        res.setHeader('Content-Encoding', 'gzip')
        return rs.pipe(createGzip())
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        //告知浏览器使用的压缩方式
        res.setHeader('Content-Encoding', 'deflate')
        return rs.pipe(createDeflate())
    }
}

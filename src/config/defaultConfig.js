module.exports = {
    hostname: '127.0.0.1',
    port: 3000,
    root: process.cwd(),
    compress: /\.(html|js|css|md)/,
    cache: {
        // 有效时间
        maxAge: 6000,
        // 用来判断本地缓存是否失效
        expires: true,
        // 用来判断本地缓存是否失效 返回相对时间
        cacheControl: true,
        // 服务器中上次修改的时间
        lastModified: true,
        // 生成hash或者其他 文件一改变值也会发生相应的变化
        etag: true
    }
}
// console.log('root', process.cwd())

module.exports = (totalSize, req, res) => {
    // totalSize为整个字节数
    const range = req.headers['range']
    if (!range) {
        return {code: 200}
    }
    // 这里正则表达式匹配到的是一个数组
    // 第一个为内容 第二个为start 第二个为end
    const sizes = range.match(/bytes=(\d*)-(\d*)/)
    const end = sizes[2] || totalSize-1
    const start = sizes[1] || totalSize-end

    if (start > end || start < 0 || end > totalSize) {
        return { code: 200}
    }
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Ranges', `bytes ${start}-${end}/${totalSize}`)
    res.setHeader('Content-length', end-start)
    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }
}

const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const path = require('path')
const Handlebars = require('handlebars')
const mime = require('./mime.js')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')

const tqlPath = path.join(__dirname, '../template/dir.tpl')
// 下面的代码如果要工作 需要source 所以用同步代码
const source = fs.readFileSync(tqlPath)
const template = Handlebars.compile(source.toString())
module.exports = async (req, res, filePath, config) => {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            const contentType = mime(filePath)
            res.setHeader('Content-Type', 'utf-8', contentType)

            // 数据是新鲜的
            if (isFresh(stats, req, res)) {
                res.statusCode = 304
                res.end()
                return
            }

            // 仅仅读一部分文件
            let rs;
            // stats.size为文件总长度
            const {code, start, end} = range(stats.size, req, res)
            // 说明处理不了 则全读取
            if (code === 200) {
                res.statusCode = 200
                rs = fs.createReadStream(filePath)
            } else {
                res.statusCode = 206
                rs = fs.createReadStream(filePath, {start, end})
            }

            // 符合的文件类型才压缩
            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            const dir = path.relative(config.root, filePath)
            const data = {
                title: path.basename(filePath),
                // 从config.root到filePath的绝对路径
                dir: dir ? `/${dir}` : '',  //需要加根路径 relative如果遇到本来就是根路径的话 就返回空 也就不需要加/了
                files: files.map(file => {
                    return {
                        file,
                        icon: mime(file)
                    }
                })
            }
            // console.log(dir,'-',data.dir)
            res.end(template(data))
        }
    } catch (err) {
        console.error(err)
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is not a directory or file`)
    }
}

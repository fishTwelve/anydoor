const http = require('http')
const chalk = require('chalk')
const path = require('path')
const conf = require('./config/defaultConfig')
const fn = require('./helper/route')
const openUrl = require('./helper/open')

class Server {
    constructor (config) {
        // 这里的this指向当前实例
        this.conf = Object.assign({}, conf, config)
    }

    start () {
        const  server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url)
            fn(req, res, filePath, this.conf)
        })

        // 监听
        server.listen(this.conf.port, this.conf.hostname, () => {
            // 地址
            const addr = `http://${this.conf.hostname}:${this.conf.port}`
            console.log(`server is running at ${chalk.blue(addr)}`)
            // 自动打开url
            openUrl(addr)
        })
    }
}

module.exports = Server


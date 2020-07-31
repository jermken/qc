const fs = require('fs-extra')
const logger = require('./logger')

let copyTpl = (src, dest) => {
    return new Promise(resolve => {
        fs.copy(src, dest).then(() => {
            resolve()
        }).catch(err => {
            logger.error(err)
            process.exit(1)
        })
    })
}
class CreatePlugin {
    constructor(hook, fn) {
        this.hook = hook
        this.fn = fn
    }
    apply(compiler) {
        compiler.hooks[this.hook].tapAsync(`owner-${this.hook}-plugin`, (compilation, callback) => {
            this.fn()
            callback()
        })
    }
}
module.exports = {
    copyTpl,
    CreatePlugin
}
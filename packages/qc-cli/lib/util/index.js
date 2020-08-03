const fs = require('fs-extra')
const logger = require('./logger')
const rimraf = require('rimraf')
/**
 * 复制模板
 */
const copyTpl = (src, dest) => {
    return new Promise(resolve => {
        fs.copy(src, dest).then(() => {
            resolve()
        }).catch(err => {
            logger.error(err)
            process.exit(1)
        })
    })
}

const rmdirAsync = (dest) => {
    return new Promise((resolve, reject) => {
        rimraf(dest, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    copyTpl,
    rmdirAsync
}
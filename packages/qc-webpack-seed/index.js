const devRun = require('./compile/dev.run')
const prodRun = require('./compile/prod.run')
const fs = require('fs-extra')
const path = require('path')

const tplGenerate = (lib, packer, isTs, dest) => {
    const src = path.resolve(__dirname, isTs ? `./template/${lib}-${packer}-ts` : `./template/${lib}-${packer}`)
    return new Promise((resolve, reject) => {
        fs.copy(src, dest).then(() => {
            resolve()
        }).catch(err => {
            reject(err)
            process.exit(1)
        })
    })
}

module.exports = {
    devRun,
    prodRun,
    tplGenerate
}
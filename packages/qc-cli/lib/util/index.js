const fs = require('fs-extra')
const logger = require('./logger')
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
/**
 * 删除目录及目录下的所有文件
 */
const rmdirSync = (() => {
    const iterator = (url, dirs) => {
        const stat = fs.statSync(url)
        if(stat.isDirectory()) {
            //收集目录
            dirs.unshift(url)
            inner(url, dirs);
        } else if (stat.isFile()) {
            //直接删除文件
            fs.unlinkSync(url)
        }
    }
    const inner = (path, dirs) => {
        const arr = fs.readdirSync(path)
        for (let i = 0, el ; el = arr[i++];) {
            iterator(path+"/"+el,dirs)
        }
    }
    return (dir) => {
        return new Promise((resolve, reject) => {
            let dirs = []
            try {
                iterator(dir, dirs)
                for (let i = 0, el ; el = dirs[i++];) {
                    //一次性删除所有收集到的目录
                    fs.rmdirSync(el)
                }
                resolve()
            } catch(e) {
                //如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
                e.code === "ENOENT" ? resolve() : reject(e)
            }
        })
    }
})()

module.exports = {
    copyTpl,
    rmdirSync
}
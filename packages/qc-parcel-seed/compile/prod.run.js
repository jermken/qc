const Parcel = require('parcel-bundler')
const path = require('path')
const logger = require('../lib/util/logger')
const rimraf = require('rimraf')
const fs = require('fs')
const destConfig = require(path.resolve(process.env.CWD, './config.js'))

module.exports = async function(option) {
    let _default = {
        https: false,
        hmrHostname: 'localhost',
        port: 8080,
        outDir: './dist',
        publicUrl: './',
        minify: option.uglify,
        sourceMaps: false
    }
    let _options = { ..._default, ...(destConfig.prod || {})}
    let entryFile = path.resolve(process.env.CWD, './src/entry/**/*.html')

    const outDir = path.join(process.env.CWD, `/${_default.outDir}`)
    if (fs.existsSync(outDir)) {
        rimraf.sync(outDir)
    }
    const bundler = new Parcel(entryFile, _options)

    destConfig.beforeRun && typeof destConfig.beforeRun === 'function' && destConfig.beforeRun()
    await bundler.bundle()
    destConfig.afterRun && typeof destConfig.befoafterRunreRun === 'function' && destConfig.afterRun()

    logger.success('compiled successfully')
}
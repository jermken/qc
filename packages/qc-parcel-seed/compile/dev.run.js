const Parcel = require('parcel-bundler')
const path = require('path')
const open = require('open')
const destConfig = require(path.resolve(process.env.CWD, './config.js'))

module.exports = async function(option) {
    let _default = {
        https: false,
        cache: false,
        hmrHostname: 'localhost',
        watch: option.watch,
        minify: option.uglify,
        port: 8080
    }
    let entryFile = path.resolve(process.env.CWD, './src/entry/**/*.html')
    let _options = {..._default, ...(destConfig.dev || {})}
    let openPage = destConfig.openPage || 'index'

    destConfig.beforeRun && typeof destConfig.beforeRun === 'function' && destConfig.beforeRun()
    await new Parcel(entryFile, _options).serve(_options.port, _options.https, _options.hmrHostname)
    destConfig.afterRun && typeof destConfig.befoafterRunreRun === 'function' && destConfig.afterRun()

    open(`${_options.https ? 'https':'http'}://${_options.hmrHostname}:${_options.port}/${openPage}/${openPage}.html`)
}
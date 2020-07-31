const fs = require('fs-extra')
const path = require('path')

const curQcWebpackSeedVersion = require('../packages/qc-webpack-seed/package.json').version

const curQcParcelSeedVersion = require('../packages/qc-parcel-seed/package.json').version

const qcCliPackage = require('../packages/qc-cli/package.json')
qcCliPackage["dependencies"]["@jermken/qc-parcel-seed"] = `^${curQcParcelSeedVersion}`
qcCliPackage["dependencies"]["@jermken/qc-webpack-seed"] = `^${curQcWebpackSeedVersion}`

fs.writeFile(path.resolve(process.cwd(), `./packages/qc-cli/package.json`), JSON.stringify(qcCliPackage), 'utf-8', err => {
    if(err) {
        logger.error(err)
        process.exit(1)
    } else {
        process.exit(0)
    }
})
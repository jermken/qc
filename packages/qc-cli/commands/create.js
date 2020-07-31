const logger = require('../lib/util/logger')
const fs = require('fs-extra')
const path = require('path')
const rimraf = require('rimraf')
const { spawn } = require('child_process')
const ora = require('ora')
const inquirer = require('inquirer')
const { copyTpl } = require('../lib/util')
const { SEEDLIST } = require('../config/globalConst')
process.env.CWD = process.cwd()

let create = {
    isGitRepos: false,
    qcConfigInit: function(config) {
        let packageUrl;
        if(this.isGitRepos) {
            packageUrl = path.resolve(process.env.CWD, `./package.json`)
        } else {
            packageUrl = path.resolve(process.env.CWD, `./${config.title}/package.json`)
        }
        let packageInfo = require(packageUrl)
        packageInfo.name = config.title
        fs.writeFile(path.resolve(packageUrl), JSON.stringify(packageInfo), 'utf-8', err => {
            if(err) {
                logger.error(err)
                process.exit(1)
            } else {
                process.exit(0)
            }
        })
    },
    /**
     *
     * @param {*} config project config
     */
    generator: function(config) {
        let { lib, packer } = config
        let seed = `qc-${packer}-seed`
        if(!SEEDLIST.includes(seed)) {
            return logger.error(`template <${lib}-${packer}> is not yet supported`)
        }
        // judge the cwd is a git repository?
        if(fs.existsSync(path.join(process.env.CWD, `/.git`))) this.isGitRepos = true
        if(require('../package.json').dependencies[`@jermken/${seed}`]) {
            this.mkdir(config)
        } else {
            let dir = path.resolve(__dirname, '../')
            let spinner = ora('project template loading... \n')
            spinner.start()
            let _spawn = spawn(`${dir.substr(0,2)} && cd ${dir} && npm install @jermken/${seed}@latest --save`, {shell: true})
            _spawn.stdout.on('data', (data) => {
                logger.log(data.toString())
            })
            _spawn.stderr.on('data', (data) => {
                let info = data.toString()
                if(info.indexOf('error') > -1 || info.indexOf('ERROR') > -1) {
                    logger.error(info)
                } else if(info.indexOf('warn') > -1 || info.indexOf('WARN') > -1) {
                    logger.warn(info)
                }
            })
            _spawn.on('close', (code) => {
                if(code === 0) {
                    spinner.succeed()
                    this.mkdir(config)
                } else {
                    spinner.fail()
                }
            })
        }
    },
    /**
     *
     * @param {String} name the project name
     * @param {String} lib a framework which you will use in your project
     * @param {String} packer a packer tool which you will use in your project
     */
    mkdir: function(options) {
        let { name, lib, packer, typescript } = options
        let seed = `qc-${packer}-seed`
        let tplPath = typescript === 'true' ? `${seed}/template/${lib}-${packer}-ts` : `${seed}/template/${lib}-${packer}`
        const dest = path.join(process.env.CWD, `/${name}`)
        const _mkdir = () => {
            fs.mkdir(dest, (err) => {
                if (err) {
                    logger.error(err)
                } else {
                    let _spinner = ora('project generating...')
                    _spinner.start()
                    require(`@jermken/qc-${packer}-seed`).tplGenerate(lib, packer, typescript === 'true', dest).then(() => {
                        _spinner.succeed()
                        logger.success(`project generated successfully, please cd ${name} ,and you can run <qc dev> to start your development`)
                        this.qcConfigInit({title: name})
                    }).catch(() => {
                        _spinner.fail()
                    })
                }
            })
        }
        // if(!fs.existsSync(path.resolve(__dirname, `../node_modules/@jermken/${tplPath}`))) {
        //     return logger.error(`暂不支持 ${lib}-${packer}-ts 类型项目`)
        // }
        if(this.isGitRepos && name === __dirname ) {
            let _spinner = ora('project generating...')
            _spinner.start()
            return require(`@jermken/qc-${packer}-seed`).tplGenerate(lib, packer, typescript === 'true', path.join(process.env.CWD)).then(() => {
                _spinner.succeed()
                logger.success(`project generated successfully, please cd ${name} ,and you can run <qc dev> to start your development`)
                this.qcConfigInit({title: name})
            }).catch(err => {
                _spinner.fail()
                logger.error(err)
            })
        }
        if (fs.existsSync(dest)) {
            const prompt = inquirer.createPromptModule()
            const questions = [{
                type: 'confirm',
                name: 'rm',
                message: `${name} dictory has exited,do you want delete it and make a new one?`
            }]
            prompt(questions).then((data) => {
                if (data.rm) {
                    rimraf.sync(dest)
                    _mkdir()
                }
            }).catch(() => {
                process.exit(1)
            })
        } else {
            _mkdir()
        }
    }
}

module.exports = (config) => {
    if (!config.name) {
        logger.error('project name is required')
        process.exit(1)
    } else {
        create.generator(config)
    }
}
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const baseConf = require('./base.config.js')
let plugins = [new webpack.HotModuleReplacementPlugin()]

module.exports = (options) => merge(baseConf, {
    mode: process.env.NODE_ENV || 'development',
    output: {
        path: path.join(process.cwd(), './dist'),
        filename: '[name].js'
    },
    module: {

    },
    devServer: {
        contentBase: path.join(process.cwd(), './dist'),
        historyApiFallback: true,
        hot: true,
        port: 8080,
        open: false,
        inline: true,
        progress: true,
        quiet: options.silent || false
    },
    devtool: 'inline-source-map',
    plugins: options.silent ? plugins.concat(
            [new friendlyErrorsWebpackPlugin({messages: ['compiled successfully.']})]
        )
        :
        plugins
})

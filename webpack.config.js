/**
 * webpack package config
 * -webpack
 * -babel
 */
const path = require('path'),
    webpack = require('webpack'),
    webpackhtml = require('html-webpack-plugin');

const APP_PATH = path.resolve(__dirname, './src/app.js'),
    BUILD_PATH = path.resolve(__dirname, './build');

module.exports = {
    entry: [
        // 'webpack/hot/dev-server',
        APP_PATH
    ],
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: [
                    // node_module_dir
                ],
                test: /\.jsx?$/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('react', 'react.js'),
        new webpackhtml({
            title: "Hello World APP",
            filename: 'build/index.html'
        })
    ]
};
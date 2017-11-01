const path = require('path');

var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const CleanWebpackPlugin = require('clean-webpack-plugin');

var htmlWebpackFun = function (page, title) {
    return new HtmlWebpackPlugin ({
        template: `./src/${page}.html`,
        filename:  `${page}.html`,
        inject: true,
        hash: true,
        title: title,
        chunks: ['common', `${page}`]
    })
}
module.exports = {
    entry: {
        common: './src/page/common/index.js',
        index: './src/page/index/index.js',
        list: './src/page/list/index.js',
        result: './src/page/result/index.js',
        'user-login': './src/page/user-login/index.js',
        'user-register': './src/page/user-register/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            utils: __dirname + '/src/utils',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service'

        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader', options: { sourceMap: true }
                    },
                    {
                        loader: 'css-loader', options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader', options: { sourceMap: true }
                    },
                    {
                        loader: 'stylus-loader', options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        limit: 8172,
                        name: 'resource/[name].[ext]'
                    }
                  }
                ]
              },
            {
              test: /\.(string)$/,
              use: {
                loader: 'html-loader'
              }
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  //resolve-url-loader may be chained before sass-loader if necessary
                  use: ['css-loader', 'stylus-loader']
                })
              },
            {
                 test: /\.js$/,
                 exclude: /(node_modules|bower_components)/,
                 use: {
                   loader: 'babel-loader',
                   options: {
                     presets: ['env']
                   }
                 }
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
       contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        htmlWebpackFun('index', '首页'),
        htmlWebpackFun('list', '列表页'),
        htmlWebpackFun('result', '结果页'),
        htmlWebpackFun('user-login', '用户登录'),
        htmlWebpackFun('user-register', '用户注册')

    ]
}

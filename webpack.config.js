var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    devtool: "source-map",
    entry: "./index.jsx",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader:'style!css!'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.scss$/,
                loader: "style!css!autoprefixer!sass"
            },
            {
                test   : /\.(ttf|jpe?g|png|gif|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                include: [__dirname],
                loader : 'file-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new HtmlWebpackPlugin({
            title: 'SMB Finder',
            template: 'index.ejs',
            inject: 'div'
        })
    ]
}

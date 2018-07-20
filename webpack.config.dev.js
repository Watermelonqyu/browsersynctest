var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        main: './src/index.js'
    },
    // target: 'web',/
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: '/',
        filename: "bundle.js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['latest']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['css-loader']
            }
        ]
    },
    plugins: [
        // new UglifyJsPlugin()
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: 'src',
        hot: true
    }
};
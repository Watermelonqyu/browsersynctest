var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
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
                        presets: ["latest"]
                    }
                }]
            },
            {
                test: /.\css$/,
                include: __dirname + "./src/css",
                exclude: __dirname + "./src/js",
                use: [
                    'style-loader',
                    {
                        loader: 'css',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
        // ,
        // loaders: [
        //     {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
        //     {test: /\.css$/, loaders: ['style', 'css']}
        // ]
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
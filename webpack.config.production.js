const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode: "production",
    output: {
        path: __dirname + '/dist',
        filename: "[name].maximpos-prod-entry.js",
        chunkFilename: '[name]-maxim.js',
        publicPath: '/dist/'
    },  
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },  
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        })
    ],
    devServer: {        
        historyApiFallback: true,
        // Delay the rebuild after the first change
        aggregateTimeout: 300,
        // Poll using interval (in ms, accepts boolean too)
        poll: 1000

    }
};

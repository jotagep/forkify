const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const javascript = {
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader'
        }       
    ]
}

module.exports = {
    entry: ['babel-polyfill','./src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin ({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [javascript]
    }
}
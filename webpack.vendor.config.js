const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        react: ['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vendor.dll.js',
        library: '[name]_dll_lib'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist', 'manifest.json'),
            name: '[name]_dll_lib'
        })
    ]
}
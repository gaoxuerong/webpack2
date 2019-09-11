const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin') // 抽离css为一个单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 优化css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 删除文件 插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack  = require('webpack')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // externals: {// 里边的内容不打包，被忽略
  //   jquery: '$'
  // },
  output: {
    filename: 'bundle.[hash:5].js',
    // publicPath: 'http://cdn.dtwave.com/',
    path: path.resolve(__dirname, 'dist')
  },
  // optimization: {
  //   minimizer:[
  //     new OptimizeCssAssetsPlugin(),
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true
  //     })
  //   ]
  // },
  devServer: {
    port: 3000,
    progress: true,
    compress: true
  },
  module: {
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$'
      //   // 内联 loader
      // },
      // {
      //   test: /\.js$/,
      //   exclude: [
      //     path.resolve(__dirname, "node_modules")
      //   ],
      //   include: [
      //     path.resolve(__dirname, "src")
      //   ],
      //   use: ['eslint-loader'],
      //   enforce: 'pre'
      // },
      {
        test: /\.html$/, //css-loader 接续@import 这种语法的；style-loader它是把css插到head标签中；
        use: ['html-withimg-loader']
      },
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        include: [
          path.resolve(__dirname, "src")
        ],
        use: ['babel-loader']
      },
      {
        test: /\.css$/, //css-loader 接续@import 这种语法的；style-loader它是把css插到head标签中；
        use: [MiniCssPlugin.loader, 'css-loader','postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssPlugin.loader, 'css-loader','postcss-loader','less-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options:{
            limit: 2*1024,
            outputPath: 'img'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
       // 将$注入全局的每一个模块
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeAttributeQuotes: true
      },
      hash: true
    }),
    new MiniCssPlugin({
      filename: 'main.css'
    }),
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
        banner: 'edit 甘七',
    }),
    new CopyWebpackPlugin([
      {from: './doc',to: './doc'}
    ])
  ]
}
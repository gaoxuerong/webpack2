const babel = require('@babel/core')
const loaderUtils = require('loader-utils')
function loader(source) {
  let options = loaderUtils.getOptions(this)
  let cb = this.async()
  babel.transform(source,{
    ...options, // 预设
    sourceMap: true,// 是否需要sourceMap
    filename: this.resourcePath.split('/').pop()
  },function(err,result){
    cb(err,result.code,result.map)
  })
}
module.exports = loader

/*
对应的webpack.config.js的配置
resolveLoader: {
  modules: [
    'node_modules',
    path.resolve(__dirname, 'loader')
  ]
},
devtool: 'source-map',
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader:'babel-loader',
        options: {
          presets:[
            "@babel/preset-env"
          ]
        }
      }
  }]
}
*/
## webpack文档
### 1.DefinePlugin
> DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用；
```
new webpack.DefinePlugin({
  DEV: "'development'"
})
然后可以通过判断if(DEV === 'development'){
  url = 'http://49.XX.XX.XX'
} else {
  url = 'https://www.domain.XX.XX'
}
来决定使用什么环境的接口；
也可以设置其他的全局变量；巴拉巴拉......
```
### 2.ignorePlugin
> 忽略regExp匹配的模块
```
例如：
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)

```
### 3.dllPlugin
>这个插件会生成一个manifest.json的文件；对于第三方依赖的库如vue，vuex，react等，我们在打包时会和自己本地的代码分开打包，这样做的好处是不会再去多次编译第三方库，第三方库在第一次打包的时候只打包一次，以后只要不升级第三方包，webpack就不会再打包，大大加快了构建速度；参考：https://www.cnblogs.com/tugenhua0707/p/9520780.html
### 4.noParse
>module: {
>    noParse: /jquery|lodash/
>  }
>   不去解析依赖项，加快打包速度
### 5.cleanWebpackPlugin
> 打包之前先清除之前打包的
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
plugins: [
 new CleanWebpackPlugin()
]
```
### 6.copyWebpackPlugin
> 直接拷贝文件的
```
plugins: [
    new CopyWebpackPlugin([
      {from: './doc',to: './doc'}
    ])
  ],
```
### 7.BannerPlugin
```
const webpack  = require('webpack')
首先要把webpack引进来，因为BannerPlugin是webpack内置的；BannerPlugin就是在打包出来的文件之前都加上注释；
new webpack.BannerPlugin({
  banner: 'edit 甘七',
}),
```
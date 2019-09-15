const fs = require('fs')
const path = require('path')
let babylon = require('babylon')
const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const parser = require('@babel/parser')
const ejs = require('ejs')
class Compiler {
  constructor(config) {
    this.config = config
    // 保存文件入口路径
    this.entryId;
    // 保存所有的模块依赖
    this.modules = {}
    this.entry = config.entry // 入口路径
    this.root = process.cwd() // 工作路径
  }
  getSource(modulePath) {
    let rules = this.config.module.rules
    let content = fs.readFileSync(modulePath, 'utf8')
    for(let index = 0;index < rules.length;index++) {
      let rule = rules[index]
      let { test, use } = rule
      let Len = use.length - 1
      if(test.test(modulePath)) {
        function normalLoader() {
          let loader = require(use[Len--])
          content = loader(content)
          // 递归调用 loader
          if(Len >= 0) {
            normalLoader()
          }
        }
        normalLoader()
      }
    }
    return content
  }
  // 解析源码
  parse(source, parentPath) { // AST解析语法树
    let ast = babylon.parse(source)
    let dependencies = []
    traverse(ast, {
      CallExpression(p) {
        let node = p.node;
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__'
          let moduleName = node.arguments[0].value
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')
          moduleName = './' + path.join(parentPath, moduleName)
          dependencies.push(moduleName)
          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    })
    let sourceCode = generator(ast).code
    return {
      sourceCode,
      dependencies
    }
  }
  buildModule(modulePath, isEntry) {
    // 拿到入口模块的内容
    let source = this.getSource(modulePath)
    // 拿到入口模块的相对路径,
    let moduleName = './' + path.relative(this.root, modulePath)
    if (isEntry) {
      this.entryId = moduleName
    }
    // 解析source内容，进行改造，返回一个依赖列表
    let {
      sourceCode,
      dependencies
    } = this.parse(source, path.dirname(moduleName))
    // 相对路径和内容对应起来
    this.modules[moduleName] = sourceCode
    dependencies.forEach((dependency) => {
      this.buildModule(path.join(this.root, dependency), false)
    })
  }
  emitFile() {
    let mainOutput = path.join(this.config.output.path, this.config.output.filename)
    let templateStr = this.getSource(path.join(__dirname,'main.ejs'))
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules
    })
    this.assets = {}
    this.assets[mainOutput] = code
    fs.writeFileSync(mainOutput,this.assets[mainOutput])
  }
  run() {
    // 执行并创建所有的模块依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true)
    // 发射一个文件，打包后的文件
    this.emitFile()
  }
}

module.exports = Compiler
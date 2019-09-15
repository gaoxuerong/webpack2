#! /usr/bin/env node
const path = require('path')
const config = require(path.resolve('webpack.config.js'))
const Compiler = require('./lib/Compiler.js')
let compiler = new Compiler(config)
// 标识运行编译
compiler.run()

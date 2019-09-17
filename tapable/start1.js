const {
  SyncHook
} = require("./SyncHook.js");
class Lesson{
  constructor(){
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  start() {
    this.hooks.arch.call('甘七')
  }
  tap() {
    this.hooks.arch.tap('node', function(name) {
      console.log('node'+name)
    })
    this.hooks.arch.tap('react', function(name) {
      console.log('react'+name)
    })
  }
}
let l = new Lesson()
l.tap() // 注册事件
l.start() // 启动钩子
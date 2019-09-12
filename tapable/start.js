const {
  SyncHook
} = require("tapable");

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
    this.hooks.arch.tap('node', function() {

    })
    this.hooks.arch.tap('react', function() {
      
    })
  }
}
let l = new Lesson()
l.tap() // 注册时间
l.start() // 启动钩子
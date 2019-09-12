class SyncHook {
  constructor(args){
    this.tasks = []
  }
  tap(name,task){
    this.tasks.push(task)
  }
  call(...args){
    this.tasks.forEach((task)=>{
      task(...args)
    })
  }
}
let hook = new SyncHook(['name'])
hook.tap('react',function(){
  console.log('react',name)
})
hook.tap('node',function(){
  console.log('node',name)
})
hook.call('甘七')
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
module.exports = {
  SyncHook
}
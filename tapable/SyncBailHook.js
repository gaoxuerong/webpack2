class SyncBailHook {
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    let index = 0;
    let res;
    do {
      res = this.tasks[index++](...args)
    } while (res === undefined && index < this.tasks.length)
  }
}
module.exports = {
  SyncBailHook
}
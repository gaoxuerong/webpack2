class SyncLoopHook {
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    this.tasks.forEach((task) => {
      let res;
      do {
        res = task(...args)
      } while (res != undefined)
    })
  }
}
module.exports = {
  SyncLoopHook
}
class SyncWaterfallHook {
  constructor(args) {
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    let [first, ...others] = this.tasks
    let res = first(...args)
    others.reduce((a, b) => {
      return b(a)
    }, res)
  }
}
module.exports = {
  SyncWaterfallHook
}
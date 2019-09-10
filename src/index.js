// import $ from 'jquery'
console.log($)
require('./index.css')
require('./a.less')
require('@babel/polyfill')
require('./use.js')
/* webpack打包我们的图片
1. js创建的；要用file-loader
2. css的background引入的；css-loader会处理的
3. <img src="">  要用html-withimg-loader */
let img = new Image()
img.src = 'http://cdn.dtwave.com/dtwave-flex/1.0.6/08grey.806595b7.svg'
document.body.appendChild(img)
let fn = () => {
  console.log(`111`)
}
fn()
class A {
  a = 1
}
let instanceA = new A()
console.log(instanceA.a)

@testable
class MyTestableClass {
  constructor() {
  }
  A() {
    return `😊`
  }
}

function testable(target) {
  target.isTestable = true;
}

console.log(MyTestableClass.isTestable)
  function * gen(){
    yield 1;
  }
  console.log(gen().next())
  console.log('aaa'.includes('a')) //可以用@babel/polyfill
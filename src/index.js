// let str = require('./test.js')
// const i = "hello  xhb"
// console.log(str)

// require('./index.css')
// require('./index.less')
// let fn = () => {
//     console.log(str)
// }
// class A{ // ES7 语法 需要新的插件
//     a= 1
// }

// expose-loader 暴露全局的loader
// 能打包 但是 不会挂载到浏览器的window对象上
// pre loader
// normal
//post
// 内联
console.log($) 


// 引入第三方模块  以jquery为例
/**
 * 1. expose-loader 暴露到window
 * 2. provicePlugin 给每个模块加一份
 * 3. 通过cdn 引入 但是不打包
 */
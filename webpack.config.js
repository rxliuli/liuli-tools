const path = require('path')
const fs = require('fs')

/**
 * 自行实现 flatMap，将数组压平一层
 * @param {Array} arr 数组
 * @param {Function} fn 映射方法，将一个元素映射为一个数组
 * @returns {Array} 压平一层的数组
 */
function flatMap(arr, fn) {
  return arr.reduce((res, item) => res.concat(fn(item)), [])
}

/**
 * 将数组转化为一个 Object 对象
 * @param {Array} arr 需要进行转换的数组
 * @param {Function} kFn 生成对象属性名的函数
 * @param {Function} {vFn} 生成对象属性值的函数，默认为数组中的迭代元素
 * @returns {Object} 转化得到的对象
 */
function toObject(arr, kFn, vFn = item => item) {
  return arr.reduce((res, item) => {
    if (!res.hasOwnProperty(kFn(item))) {
      res[kFn(item)] = vFn(item)
    }
    return res
  }, {})
}

/**
 * 递归读取文件夹及其子文件夹
 * @param {String} realpath 读取的根路径
 */
function recursiveReadFile(realpath) {
  return flatMap(fs.readdirSync(realpath), f => {
    var template = path.resolve(__dirname, realpath, f)
    // 如果是文件就直接返回
    var stats = fs.statSync(template)
    if (!stats.isDirectory()) {
      return {
        name: f,
        path: template
      }
    }
    // 如果是文件夹就递归调用
    return recursiveReadFile(template)
  })
}

var fns = recursiveReadFile(path.resolve(__dirname, './src/module'))
var res = toObject(
  fns,
  o => o.name.substr(0, o.name.length - 3),
  o => require(o.path)
)

module.exports = {
  entry: res,
  output: {
    filename: 'budle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

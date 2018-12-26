import path from 'path'
import fs from 'fs'
import flatMap from './module/array/flatMap'
import toObject from './module/array/toObject'

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

var fns = recursiveReadFile(path.resolve(__dirname, './module'))
var res = toObject(
  fns,
  o => o.name.substr(0, o.name.length - 3),
  o => require(o.path)
)

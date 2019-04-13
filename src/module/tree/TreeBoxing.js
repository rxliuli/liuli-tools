import { flatMap } from './../array/flatMap'
import { arrayToMap } from './../array/arrayToMap'
import { groupBy } from './../array/groupBy'
import { arrayDiffBy } from './../array/arrayDiffBy'

/**
 * 树节点基类，子类必须实现
 * @class BaseNode
 */
export class BaseNode {
  /**
   * 构造函数
   * @param {Object} option 可选项
   * @param {String|Number} option.id 树节点 id
   * @param {String|Number} option.parentId 父节点 id
   */
  constructor ({ id, parentId }) {
    /**
     * @field 树节点 id
     */
    this.id = id
    /**
     * @field 父节点 id
     */
    this.parentId = parentId
    /**
     * @field 绝对路径
     * @type {String}
     */
    this.path = undefined
    /**
     * @field 子节点
     * @type {Array.<String>}
     */
    this.child = undefined
  }
}

/**
 * 树结构包装类
 * @class TreeBoxing
 */
export class TreeBoxing {
  /**
   * 根据树节点创建包装对象
   * @param {BaseNode} node 树节点
   * @returns {TreeBoxing} 包装对象
   */
  static fromTree (node) {
    // 树结构专列表，并且计算路径
    function treeToList (node, parentPath) {
      node.path = (parentPath ? parentPath + ',' : '') + node.id
      return [node].concat(
        node.child
          ? flatMap(node.child, node => treeToList(node, node.path))
          : []
      )
    }
    return new TreeBoxing({
      list: treeToList(node)
    })
  }
  /**
   * 根据树节点列表创建一个包装对象
   * @param {Array.<BaseNode>} list 树节点列表
   * @returns {TreeBoxing} 包装对象
   */
  static fromList (list) {
    const idMap = arrayToMap(list, ({ id }) => id)
    const parentMap = groupBy(list, ({ parentId }) => parentId)
    // 计算每个节点的绝对路径
    function calcPath (node) {
      if (!node.parentId) {
        return node.id
      }
      const parentPath = calcPath(idMap.get(node.parentId))
      return (parentPath ? parentPath + ',' : '') + node.id
    }
    return new TreeBoxing({
      list: list.map(node => {
        node.path = calcPath(node)
        return node
      }),
      idMap,
      parentMap
    })
  }
  constructor ({
    list,
    idMap = arrayToMap(list, ({ id }) => id),
    parentMap = groupBy(list, ({ parentId }) => parentId)
  }) {
    this.list = list
    this.idMap = idMap
    this.parentMap = parentMap
  }
  /**
   * 将内置的列表转换为树节点
   * 注: 这是一个终端操作
   * @param {Array.<BaseNode>} list 树节点列表
   * @returns {BaseNode} 树节点
   */
  toTree () {
    return this.list.reduce((root, sub) => {
      this.list.forEach(parent => {
        if (sub.parentId === parent.id) {
          (parent.child = parent.child || []).push(sub)
        }
      })
      if (!sub.parentId) {
        root = sub
      }
      return root
    })
  }
  /**
   * 根据 id 获取到树节点
   * 注: 这是一个终端操作
   * @param {String|Number} id 树节点 id
   * @returns {BaseNode} 树节点
   */
  get (id) {
    return this.idMap.get(id)
  }
  /**
   * 根据 parentId 获取到树节点
   * 注: 这是一个终端操作
   * @param {String|Number} id 父级树节点 id
   * @returns {Array.<BaseNode>} 子级树节点列表
   */
  listByParentId (parentId) {
    return this.parentMap.get(parentId)
  }
  /**
   * 根据指定的条件查找树节点
   * 注: 这是一个终端操作
   * @param {Function} predicate 查找谓词，接受一个树节点 {@link BaseNode} 参数，返回 {@link Boolean} 结果
   * @returns {BaseNode} 查找的树节点
   */
  find (predicate) {
    return this.list.find(predicate)
  }
  /**
   * 计算两个树节点之间的最短路径
   * 注: 这是一个终端操作
   * @param {BaseNode} startId 开始节点
   * @param {BaseNode} endId 结束节点
   */
  path (startId, endId) {
    const startArr = this.idMap.get(startId).path.split(',')
    const endArr = this.idMap.get(endId).path.split(',')
    const { left, right, common } = arrayDiffBy(startArr, endArr)
    return left
      .reverse()
      .concat(common[common.length - 1])
      .concat(right)
  }
}

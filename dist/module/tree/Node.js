var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/**
 * 基本的 Node 节点结构定义接口
 * @interface
 */
export class INode {
    /**
     * 构造函数
     * @param {Object} [options] 可选项参数
     * @param {String} [options.id] 树结点的 id 属性名
     * @param {String} [options.parentId] 树结点的父节点 id 属性名
     * @param {String} [options.child] 树结点的子节点数组属性名
     * @param {String} [options.path] 树结点的全路径属性名
     * @param {Array.<Object>} [options.args] 其他参数
     */
    constructor(_a = {}) {
        var { id, parentId, child, path } = _a, args = __rest(_a, ["id", "parentId", "child", "path"]);
        /**
         * @field 树结点的 id 属性名
         */
        this.id = id;
        /**
         * @field 树结点的父节点 id 属性名
         */
        this.parentId = parentId;
        /**
         * @field 树结点的子节点数组属性名
         */
        this.child = child;
        /**
         * @field 树结点的全路径属性名
         */
        this.path = path;
        Object.assign(this, args);
    }
}

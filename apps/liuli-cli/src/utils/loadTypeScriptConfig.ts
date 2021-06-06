/**
 * 加载 ts 类型的配置文件
 */
export function loadTypeScriptConfig(configPath: string) {
  //避免使用 ts-node 运行导致多次编译 ts 的错误，参考：https://github.com/TypeStrong/ts-node/issues/883
  if (!require.extensions['.ts']) {
    // noinspection TypeScriptValidateJSTypes
    require('ts-node').register()
  }
  return require(configPath)
}

/**
 * 加载 ts 类型的配置文件
 */
export function loadTypeScriptConfig(configPath: string) {
  // noinspection TypeScriptValidateJSTypes
  require('ts-node').register()
  return require(configPath)
}

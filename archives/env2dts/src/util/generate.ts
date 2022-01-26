/**
 * 根据环境变量名字列表生成 dts 代码
 * 目前生成的逻辑非常简单，但考虑到后面可能需要基于 ts ast 处理，所以还是写成了单独的函数
 * @param envs
 */
export function generate(envs: string[]): Map<string, string> {
  return envs.reduce((res, env) => {
    res.set(env, `${env}: string`)
    return res
  }, new Map<string, string>())
}

import simpleGit from 'simple-git'

type Last = {
  module: string
  version: string
}

/**
 * 获取最后一个标签
 */
export async function getLast(): Promise<Last | null> {
  const git = simpleGit()
  const last = (await git.tags()).latest
  if (!last) {
    return null
  }
  const matchTagRegexp = /(.*)@(\d\.\d\.\d)/
  if (!matchTagRegexp.test(last)) {
    return null
  }
  const [, module, version] = matchTagRegexp.exec(last)!
  return { module, version }
}

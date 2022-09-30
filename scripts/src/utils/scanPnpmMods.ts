import { AsyncArray } from '@liuli-util/async'
import { pathExists, readFile } from '@liuli-util/fs-extra'
import * as path from 'path'
import { parse } from 'yaml'
import FastGlob from 'fast-glob'

export function longestCommonPrefix(strs: string[]): string {
  if (!strs || !strs.length) {
    return ''
  }
  const str = strs[0]
  let index = 0
  while (index < str.length) {
    // 从第一项截取前缀
    const prefix = str.slice(0, index + 1)
    // 判断后面的项是否都含有此前缀
    for (let i = 1; i < strs.length; i++) {
      // 不以此前缀开头时，返回结果
      if (!strs[i].startsWith(prefix)) {
        return str.slice(0, index)
      }
    }
    index++
  }
  return str
}

/**
 * 扫描 pnpm 的模块列表
 */
export async function scanPnpmMods(rootPath: string): Promise<string[]> {
  const config = parse(await readFile(path.resolve(rootPath, 'pnpm-workspace.yaml'), 'utf-8'))
  const list = await FastGlob(config.packages, { cwd: rootPath, onlyDirectories: true })
  return AsyncArray.filter(list, (s) => pathExists(path.resolve(rootPath, s, 'package.json')))
}

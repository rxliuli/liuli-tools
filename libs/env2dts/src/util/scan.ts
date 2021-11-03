import promise from 'glob-promise'
import path from 'path'
import { readFile } from 'fs-extra'
import { parse } from 'dotenv'
import { uniq } from 'lodash'

/**
 * 扫描所有的文件
 */
export async function scan(dir: string): Promise<string[]> {
  const files = await promise('.env*', {
    cwd: path.resolve(dir),
  })
  const configs = await Promise.all(files.map((file) => readFile(path.resolve(dir, file), 'utf-8')))
  return uniq(configs.map((s) => Object.keys(parse(s))).flat())
}

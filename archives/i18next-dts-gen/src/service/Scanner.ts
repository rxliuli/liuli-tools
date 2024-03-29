import { readdir, readJSON } from '@liuli-util/fs-extra'
import path from 'path'
import { AsyncArray } from '@liuli-util/async'
import { LocaleJSON } from './Parser'

/**
 * 扫描指定目录下的 json 文件，得到结构化数据
 */
export class Scanner {
  async scan(dirPath: string): Promise<LocaleJSON[]> {
    const files = await readdir(path.resolve(dirPath))

    return await AsyncArray.map(
      files.filter((file) => file.endsWith('.json')),
      async (file) => {
        const filePath = path.resolve(dirPath, file)

        return {
          path: filePath,
          data: await readJSON(filePath),
        }
      },
    )
  }
}

import { Plugin } from 'esbuild'
import { writeJson } from '@liuli-util/fs-extra'

/**
 * 生成 metafile 的插件
 * @param metafilePath
 */
export function metafile(metafilePath: string): Plugin {
  return {
    name: 'metafile',

    setup(builder) {
      builder.onEnd(async (result) => {
        await writeJson(metafilePath, result.metafile)
      })
    },
  }
}

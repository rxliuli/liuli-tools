import { Plugin } from 'rollup'
import path from 'path'
import { pluginName } from './constants'

export function workerThreadsSuffix(): Plugin {
  return {
    name: pluginName,
    outputOptions(outputOptions) {
      //如果用户有传入这个配置，则优先使用它
      const old = outputOptions.manualChunks
      outputOptions.manualChunks = (id, api) => {
        if (typeof old === 'function') {
          const res = old(id, api) as string | null
          if (typeof res === 'string') {
            return res
          }
        }
        const regExp = new RegExp('.worker.[jt]s$')
        if (regExp.test(id)) {
          const fileName = path.basename(id)
          return fileName.substr(0, fileName.length - path.extname(id).length)
        }
      }
    },
  } as Plugin
}

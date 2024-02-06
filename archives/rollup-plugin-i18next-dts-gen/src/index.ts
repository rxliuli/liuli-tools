import { Plugin } from 'rollup'
import { GenerateOptions, GeneratorCommandProgram } from '@liuli-util/i18next-dts-gen'
import { SetOptional } from 'type-fest'

/**
 * 生成 i18next dts 的插件
 * @param options
 */
export function i18nextDtsGen(options: SetOptional<Omit<GenerateOptions, 'watch'>, 'language'>): Plugin {
  let watchFlag = false
  return {
    name: 'rollup-plugin-i18next-dts-gen',
    async buildStart() {
      if (watchFlag) {
        return
      }
      watchFlag = true
      await new GeneratorCommandProgram().main({
        language: 'en',
        ...options,
        watch: this.meta.watchMode,
      })
    },
  }
}

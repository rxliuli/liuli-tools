import { Plugin } from 'rollup'
import {
  GenerateOptions,
  GeneratorCommandProgram,
} from '@liuli-util/i18next-dts-gen'
import { SetOptional } from 'type-fest'

export function i18nextDtsGen(
  options: SetOptional<Omit<GenerateOptions, 'watch'>, 'language'>,
): Plugin {
  return {
    name: 'rollup-plugin-i18next-dts-gen',
    async buildStart() {
      await new GeneratorCommandProgram().main({
        language: 'en',
        ...options,
        watch: this.meta.watchMode,
      })
    },
  }
}

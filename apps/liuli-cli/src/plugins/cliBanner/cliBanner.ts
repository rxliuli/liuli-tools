import type {
  NormalizedOutputOptions,
  OutputBundle,
  OutputChunk,
  Plugin,
} from 'rollup'

export function cliBanner(): Plugin {
  const hashbang = '#!/usr/bin/env node'

  return {
    name: '@liuli-util/rollup-plugin-cli-banner',
    generateBundle(
      options: NormalizedOutputOptions,
      bundle: OutputBundle,
      _isWrite: boolean,
    ) {
      Object.entries(bundle)
        .filter(([_name, option]) => option.type === 'chunk')
        .forEach(([_name, option]) => {
          const _option = option as OutputChunk
          _option.code = hashbang + '\n' + _option.code
        })
    },
  }
}

import type { NormalizedOutputOptions, OutputBundle, OutputChunk } from 'rollup'

export function cliBanner() {
  const hashbang = '#!/usr/bin/env node'

  return {
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

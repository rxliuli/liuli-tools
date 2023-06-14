import { Plugin } from 'esbuild'
import { readJson } from '@liuli-util/fs-extra'
import path from 'path'

function generateBanner(meta: object) {
  return (
    [
      '// ==UserScript==',
      ...Object.entries(meta)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((item) => `// @${key} ${item}`)
          }

          return `// @${key} ${value}`
        })
        .flat(),
      '// ==/UserScript==',
    ].join('\n') + '\n'
  )
}

export function userJS(): Plugin {
  return {
    name: 'userJS',

    async setup(build) {
      const json = (await readJson(path.resolve(build.initialOptions.absWorkingDir!, 'package.json'))) as {
        userjs: object
      }

      if (!json.userjs) {
        throw new Error('userjs is not supported')
      }

      if (!build.initialOptions.banner) {
        build.initialOptions.banner = {}
      }

      build.initialOptions.banner!['js'] = generateBanner(json.userjs)
    },
  }
}

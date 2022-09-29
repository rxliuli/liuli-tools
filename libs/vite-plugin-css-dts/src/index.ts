import { Plugin, ResolvedConfig } from 'vite'
import { globby } from 'globby'
import path from 'path'
import { pathExists, readFile, remove, writeFile } from '@liuli-util/fs-extra'
import { watch } from 'chokidar'
import { generate } from './generate'

export function cssdts(): Plugin {
  let config: ResolvedConfig

  async function generateByPath(item: string) {
    const cssPath = path.resolve(config.root, item)
    const code = await readFile(cssPath, 'utf-8')
    const dtsPath = cssPath + '.d.ts'
    await writeFile(dtsPath, generate(code, cssPath, dtsPath))
  }

  return {
    name: 'vite-plugin-cssdts',

    configResolved(_config) {
      config = _config
    },

    async buildStart() {
      const list = await globby('src/**/*.module.css', {
        cwd: config.root,
      })

      await Promise.all(
        list.map(async (item) => {
          const cssPath = path.resolve(config.root, item)
          await generateByPath(cssPath)
        }),
      )
    },

    configureServer(server) {
      watch('src/**/*.module.css', {
        cwd: config.root,
      })
        .on('add', generateByPath)
        .on('change', generateByPath)
        .on('unlink', async (cssPath) => {
          if (cssPath.endsWith('.module.css')) {
            const dtsPath = cssPath + '.d.ts'

            if (await pathExists(dtsPath)) {
              await remove(dtsPath)
            }
          }
        })
    },
  }
}

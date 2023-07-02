import path from 'node:path'
import { Plugin } from 'vite'
import { merge } from 'lodash-es'
import { cp, readFile, rm, writeFile } from 'node:fs/promises'
import { Manifest } from 'webextension-polyfill'
import { DeepPartial } from 'utility-types'

export function firefox(manifest: DeepPartial<Manifest.WebExtensionManifest>): Plugin {
  return {
    name: 'vite-plugin-firefox-dist',
    async closeBundle() {
      const firefoxDist = path.resolve('./dist-firefox')
      await rm(firefoxDist, { recursive: true, force: true })
      await cp(path.resolve('./dist'), firefoxDist, {
        recursive: true,
        force: true,
      })
      const jsonPath = path.resolve(firefoxDist, 'manifest.json')
      await writeFile(jsonPath, JSON.stringify(merge(JSON.parse(await readFile(jsonPath, 'utf-8')), manifest), null, 2))
    },
    apply: 'build',
  }
}

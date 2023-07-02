import path from 'node:path'
import { Plugin } from 'vite'
import { merge } from 'lodash-es'
import { cp, readFile, rm, writeFile } from 'node:fs/promises'
import { Manifest } from 'webextension-polyfill'
import { DeepPartial } from 'utility-types'

/**
 * 将构建的 dist/ 目录中的 chrome 插件复制到 dist-firefox 中生成 firefox 插件
 * @param manifest 需要合并的 manifest 对象
 * @returns
 */
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
      const json = JSON.parse(await readFile(jsonPath, 'utf-8')) as Manifest.WebExtensionManifest
      // 需要转换 background 字段，参考: https://github.com/mozilla/web-ext/issues/2532
      if (json.background && 'service_worker' in json.background) {
        json.background = {
          scripts: [json.background.service_worker],
          type: json.background.type,
        }
      }
      await writeFile(jsonPath, JSON.stringify(merge(json, manifest), null, 2))
    },
    apply: 'build',
  }
}

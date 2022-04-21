import { Plugin } from 'vite'
import { pathExists, readFile, readJson, writeFile } from 'fs-extra'
import * as path from 'path'
import { parse as parseEnv, stringify } from 'envfile'
import { parse } from 'node-html-parser'

/**
 * 重写 .env.local 环境变量
 * @param root
 */
export async function rewriteEnv(root: string) {
  const json = await readJson(path.resolve(root, 'package.json'))
  const envPath = path.resolve(root, '.env.local')
  if (!(await pathExists(envPath))) {
    await writeFile(envPath, '')
  }
  await writeFile(
    envPath,
    stringify({
      ...parseEnv(await readFile(envPath, 'utf-8')),
      VITE_VERSION: json.version,
    }),
  )
}

export function rewriteHTML(html: string, version: string) {
  const htmlElement = parse(html)
  if (htmlElement.querySelector('meta[name="version"]')) {
    htmlElement.querySelector('meta[name="version"]')!.setAttribute('content', version)
  } else {
    htmlElement.querySelector('head')!.appendChild(parse(`<meta name="version" content="${version}" />`))
  }
  return htmlElement.toString()
}

/**
 * 标准的版本信息
 */
export function standardInfo(): Plugin {
  let root: string
  return {
    name: 'vite-plugin-standard-info',
    async configResolved(config) {
      root = config.root
      await rewriteEnv(root)
    },
    async transformIndexHtml(html) {
      const json = await readJson(path.resolve(root, 'package.json'))
      return rewriteHTML(html, json.version)
    },
  }
}

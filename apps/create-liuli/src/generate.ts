import { copy, pathExists, readJson, writeJson } from '@liuli-util/fs-extra'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { PackageJson } from 'type-fest'

export interface GenerateOptions {
  cwd: string
  type: 'lib' | 'cli'
  name: string
  overwrite?: boolean
}

export async function generate(options: GenerateOptions) {
  const name = options.name.startsWith('@') ? options.name.split('/')[1] : options.name
  const distPath = path.resolve(options.cwd, name)

  const templatePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), `../templates/${options.type}`)

  if ((await pathExists(distPath)) && !options.overwrite) {
    console.warn('目录已存在: ', options.name)
    return
  }

  await copy(templatePath, distPath, {
    overwrite: true,
    filter: (source) => path.basename(source) !== 'node_modules',
  })

  const jsonPath = path.resolve(distPath, 'package.json')
  const json = (await readJson(jsonPath)) as PackageJson
  json.name = options.name

  await writeJson(jsonPath, json, {
    spaces: 2,
  })
}

import inquirer, { DistinctQuestion } from 'inquirer'
import Mustache from 'mustache'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cp, readdir } from 'node:fs/promises'
import { extract, pathExists, changeJson, changeFile } from './utils'

type GenerateType = 'lib' | 'cli'

export interface GenerateOptions {
  cwd: string
  template: GenerateType
  name: string
  overwrite?: boolean
}

interface RenderOptions extends GenerateOptions {
  dirName: string
}

export async function initOptions(options: Partial<GenerateOptions>): Promise<GenerateOptions> {
  const list: DistinctQuestion[] = (
    [
      {
        name: 'name',
        type: 'input',
        message: 'project name',
      },
      {
        name: 'template',
        type: 'list',
        choices: ['lib', 'cli'] as GenerateType[],
      },
    ] as DistinctQuestion[]
  ).filter((item) => !(options as any)[item.name!])
  const res = await inquirer.prompt<Partial<Pick<GenerateOptions, 'name' | 'template'>>>(list)
  const r = Object.assign({}, options, res) as GenerateOptions
  const distPath = path.resolve(options.cwd!, extract(r.name).name)
  if (!options.overwrite && (await pathExists(distPath)) && (await readdir(distPath)).length > 0) {
    const { overwrite } = await inquirer.prompt<Pick<GenerateOptions, 'overwrite'>>([
      {
        name: 'overwrite',
        type: 'confirm',
        message: 'is overwrite?',
      },
    ])
    r.overwrite = overwrite
  } else {
    r.overwrite = true
  }
  return r
}

export async function generate(options: GenerateOptions) {
  const dirName = extract(options.name).name
  const distPath = path.resolve(options.cwd, dirName)

  const templatePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), `../packages/${options.template}`)

  if ((await pathExists(distPath)) && (await readdir(distPath)).length > 0 && !options.overwrite) {
    return
  }

  await cp(templatePath, distPath, {
    filter: (source) => path.basename(source) !== 'node_modules',
    force: true,
    recursive: true,
  })

  const list = [
    'package.json',
    // 'README.md'
  ]
  const renderOptions: RenderOptions = { ...options, dirName }
  await Promise.all(
    list.map(async (item) => changeFile(path.resolve(distPath, item), (s) => Mustache.render(s, renderOptions))),
  )
  await changeJson(path.resolve(distPath, 'package.json'), (json) => {
    json.name = options.name
  })
}

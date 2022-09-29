import path from 'path'

import { copy, pathExists, readdir, readFile, readJSON, remove, writeFile, writeJSON } from '@liuli-util/fs-extra'

import { prompt } from 'enquirer'
import { SyncProgram } from '../sync/SyncProgram'
import { PathUtil } from '../../PathUtil'

export enum TemplateTypeEnum {
  Cli = 'cli',
  Lib = 'lib',
}

export interface GenerateConfig {
  template: TemplateTypeEnum
  dest: string
  initSync?: boolean
}

export class GenerateProgram {
  /**
   * 生成项目
   */
  async generate(config: GenerateConfig): Promise<void> {
    if (!config.dest) {
      const { dest } = await prompt<{
        dest: string
      }>({
        name: 'dest',
        type: 'input',
        message: '请输入项目名',

        validate(input: string): boolean {
          return input.trim() !== ''
        },
      })

      config.dest = path.resolve(dest)
    }

    if (!config.template) {
      const { template } = await prompt<{
        template: TemplateTypeEnum
      }>({
        name: 'template',
        type: 'select',
        message: '请选择模板',
        choices: [TemplateTypeEnum.Lib, TemplateTypeEnum.Cli] as TemplateTypeEnum[],
      })

      config.template = template
    }

    /*
                    克隆项目
                    修改一些内容
                    共通修改
                      - 修改 package.json，删除 private，修改名字
                    模板特定修改
                     */
    const srcFile = path.resolve(PathUtil.RootPath, `templates/${config.template}`)

    const destFile = path.resolve(config.dest)

    if ((await pathExists(destFile)) && (await readdir(destFile)).some((file) => pathExists(file))) {
      const { override } = await prompt<{
        override: boolean
      }>({
        name: 'override',
        type: 'confirm',
        initial: true,
        message: '目标位置不是一个空目录，确认要覆盖么？',
      })

      if (!override) {
        return
      }
    }

    await remove(destFile)

    await copy(srcFile, destFile, {
      filter: (source) => path.basename(source) !== 'node_modules',
    })

    await GenerateProgram.updatePackageJSON(destFile)
    await GenerateProgram.updateReadme(destFile)

    if (config.initSync) {
      const syncProgram = new SyncProgram(path.resolve(config.dest))
      await syncProgram.init()
      await syncProgram.sync()
    }
  }

  static async updatePackageJSON(destFile: string): Promise<void> {
    const pkgPath = path.resolve(destFile, 'package.json')

    await writeJSON(
      pkgPath,
      {
        ...(await readJSON(pkgPath)),
        name: path.basename(destFile),
      },
      {
        spaces: 2,
      },
    )
  }

  static async updateReadme(destFile: string): Promise<void> {
    const readmePath = path.resolve(destFile, 'README.md')
    let readmeFile = await readFile(readmePath, 'utf-8')
    readmeFile = readmeFile.replace('template', path.basename(destFile))
    await writeFile(readmePath, readmeFile)
  }
}

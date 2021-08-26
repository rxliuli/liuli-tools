import { PathUtil } from '../../PathUtil'
import path from 'path'
import {
  copy,
  pathExists,
  readdir,
  readFile,
  readJSON,
  remove,
  writeFile,
  writeJSON,
} from 'fs-extra'
import { PackageJson } from 'type-fest'
import inquirer from 'inquirer'
import { SyncProgram } from '../sync/SyncProgram'

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
  async generate(config: GenerateConfig) {
    if (!config.dest) {
      const { dest } = await inquirer.prompt({
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
      const { template } = await inquirer.prompt({
        name: 'template',
        type: 'list',
        message: '请选择模板',
        choices: [
          TemplateTypeEnum.Lib,
          TemplateTypeEnum.Cli,
        ] as TemplateTypeEnum[],
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
    const srcFile = PathUtil.resolveOfProject(`templates/${config.template}`)
    const destFile = path.resolve(config.dest)
    if (
      (await pathExists(destFile)) &&
      (await readdir(destFile)).some((file) => pathExists(file))
    ) {
      const { override } = await inquirer.prompt({
        name: 'override',
        type: 'confirm',
        default: true,
        message: '目标位置不是一个空目录，确认要覆盖么？',
      })
      if (!override) {
        return
      }
    }
    await remove(destFile)
    await copy(srcFile, destFile)
    await GenerateProgram.updatePackageJSON(destFile)
    await GenerateProgram.updateReadme(destFile)
    if (config.initSync) {
      const syncProgram = new SyncProgram(path.resolve(config.dest))
      await syncProgram.init()
      await syncProgram.sync()
    }
  }

  static async updatePackageJSON(destFile: string) {
    const jsonFile = path.resolve(destFile, 'package.json')
    const json: PackageJson = await readJSON(jsonFile)
    json.name = json.name?.replace('template', path.basename(destFile))
    await writeJSON(jsonFile, json, {
      spaces: 2,
    })
  }

  static async updateReadme(destFile: string) {
    const readmePath = path.resolve(destFile, 'README.md')
    let readmeFile = await readFile(readmePath, 'utf-8')
    readmeFile = readmeFile.replace('template', path.basename(destFile))
    await writeFile(readmePath, readmeFile)
  }
}

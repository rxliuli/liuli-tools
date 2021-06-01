import { PathUtil } from '../../PathUtil'
import path from 'path'
import { copy, readJSON, remove, writeJSON } from 'fs-extra'
import { PackageJson } from 'type-fest'

export enum TemplateTypeEnum {
  Cli = 'cli',
  Lib = 'lib',
}

export interface GenerateConfig {
  template: TemplateTypeEnum
  dest: string
}

export class GenerateProgram {
  /**
   * 生成项目
   */
  async generate(config: GenerateConfig) {
    /*
    克隆项目
    修改一些内容
    共通修改
      - 修改 package.json，删除 private，修改名字
    模板特定修改
     */
    const srcFile = PathUtil.resolveOfProject(`templates/${config.template}`)
    const destFile = path.resolve(config.dest)
    await remove(destFile)
    await copy(srcFile, destFile)
    await GenerateProgram.updatePackageJSON(destFile)
  }

  private static async updatePackageJSON(destFile: string) {
    const jsonFile = path.resolve(destFile, 'package.json')
    const json: PackageJson = await readJSON(jsonFile)
    json.name = path.basename(destFile)
    delete json.private
    await writeJSON(jsonFile, json, {
      spaces: 2,
    })
  }
}

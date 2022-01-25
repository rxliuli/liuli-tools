import { pathExists, readFile, writeFile } from 'fs-extra'
import * as path from 'path'
import { OptionalKind, Project, PropertySignatureStructure } from 'ts-morph'
import { uniqueBy } from '@liuli-util/array'
import promise from 'glob-promise'
import { parse } from 'dotenv'
import { format } from 'prettier'
import prettierOptions from '@liuli-util/prettier-standard-config'

/**
 * 获取环境变量的路径
 * @param cwd
 */
async function getEnvPath(cwd: string) {
  let envPath = path.resolve(cwd, 'src/vite-env.d.ts')
  if (await pathExists(envPath)) {
    return envPath
  }
  envPath = path.resolve(cwd, 'src/env.d.ts')
  if (await pathExists(envPath)) {
    return envPath
  }
  throw new Error('未找到环境变量配置文件')
}

/**
 * 扫描所有的文件
 */
export async function scan(dir: string): Promise<string[]> {
  const files = await promise('.env*', {
    cwd: path.resolve(dir),
  })
  const configs = await Promise.all(files.map((file) => readFile(path.resolve(dir, file), 'utf-8')))
  return uniqueBy(configs.map((s) => Object.keys(parse(s))).flat())
}

export async function gen(cwd: string): Promise<void> {
  const envPath = await getEnvPath(cwd)
  const project = new Project()
  const envs = (await scan(cwd)).map(
    (item) =>
      ({
        name: item,
        type: 'string',
        isReadonly: true,
      } as OptionalKind<PropertySignatureStructure>),
  )
  const sourceFile = project.addSourceFileAtPath(envPath)
  const existsEnvDts = sourceFile.getInterface('ImportMetaEnv')
  if (existsEnvDts) {
    const set = new Set(existsEnvDts.getProperties().map((item) => item.getName()))
    existsEnvDts.addProperties(envs.filter((item) => !set.has(item.name)))
  } else {
    sourceFile.addInterface({
      name: 'ImportMetaEnv',
      properties: envs,
    })
  }
  await writeFile(envPath, format(sourceFile.getFullText(), { ...prettierOptions, parser: 'typescript' }))
}

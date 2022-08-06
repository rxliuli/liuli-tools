import { pathExists, readFile, writeFile } from 'fs-extra'
import * as path from 'path'
import { uniqueBy } from '@liuli-util/array'
import { parse } from 'dotenv'
import { CodeUtil } from './utils/CodeUtil'
import FastGlob from 'fast-glob'
import { namedTypes as n, builders as b } from 'ast-types'

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
  const files = await FastGlob('.env*', {
    cwd: path.resolve(dir),
  })
  const configs = await Promise.all(files.map((file) => readFile(path.resolve(dir, file), 'utf-8')))
  return uniqueBy(configs.map((s) => Object.keys(parse(s))).flat())
}

export function eq(a: string[], b: string[]): boolean {
  const f = (a: string, b: string) => a.localeCompare(b)
  return JSON.stringify([...a].sort(f)) === JSON.stringify([...b].sort(f))
}

export function getEnvs(ast: n.ASTNode): string[] {
  return CodeUtil.iterator(ast, n.TSInterfaceDeclaration)
    .filter((item) => (item.id as n.Identifier).name === 'ImportMetaEnv')
    .flatMap((ast) => CodeUtil.iterator(ast, n.TSPropertySignature))
    .flatMap((ast) => CodeUtil.iterator(ast, n.Identifier))
    .map((item) => item.name)
}

function convert(ast: n.ASTNode, envs: string[]): n.ASTNode {
  let envInterface = CodeUtil.iterator(ast, n.TSInterfaceDeclaration).find(
    (item) => (item.id as n.Identifier).name === 'ImportMetaEnv',
  )
  if (!envInterface) {
    envInterface = b.tsInterfaceDeclaration(b.identifier('ImportMetaEnv'), b.tsInterfaceBody([]))
    ;(ast as n.File).program.body.push(envInterface)
  }
  envInterface.body.body = envs.map((name) =>
    b.tsPropertySignature.from({
      key: b.identifier(name),
      typeAnnotation: b.tsTypeAnnotation(b.tsStringKeyword()),
      readonly: true,
    }),
  )
  return ast
}

export async function gen(cwd: string): Promise<void> {
  const envPath = await getEnvPath(cwd)
  const code = await readFile(envPath, 'utf-8')
  const ast = CodeUtil.parse(code)
  const envNames = await scan(cwd)
  if (eq(envNames, getEnvs(ast))) {
    return
  }
  await writeFile(envPath, CodeUtil.print(convert(ast, envNames)))
}

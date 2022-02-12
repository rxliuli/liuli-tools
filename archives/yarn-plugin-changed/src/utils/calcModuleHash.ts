import { ListLogLine } from 'simple-git/typings/response'
import simpleGit, { DefaultLogFields } from 'simple-git'
import path from 'path'
import { pathExists } from 'fs-extra'
import md5File from 'md5-file'
import { StatusResult } from 'simple-git/promise'

export interface ModuleHash {
  lastCommit: null | ListLogLine
  changed: string[]
}

export const git = simpleGit()

export async function getLastCommit(dir: string): Promise<DefaultLogFields | ListLogLine | null> {
  return (
    await git.log({
      file: path.resolve(dir),
    })
  ).latest
}

export async function getStatus(gitRootPath: string, dir: string): Promise<string[]> {
  // console.log('getStatus: ', dir, gitRootPath)
  let status: StatusResult
  try {
    status = await git.status([dir])
  } catch {
    console.error('git.status 失败', dir)
    throw new Error()
  }
  return Promise.all(
    status.files.map(async (item) => {
      const realPath = path.resolve(gitRootPath, item.path)
      if (await pathExists(realPath)) {
        return md5File(realPath)
      }
      return realPath
    }),
  )
}

/**
 * 计算模块的 hash 值
 */
export async function calcModuleHash(gitRootPath: string, dir: string): Promise<ModuleHash> {
  const lastCommit = (
    await git.log({
      file: dir,
    })
  ).latest
  try {
    const changed = await getStatus(gitRootPath, dir)
    return {
      lastCommit,
      changed,
    }
  } catch {
    console.error('计算 hash 值失败', dir)
    throw new Error()
  }
}

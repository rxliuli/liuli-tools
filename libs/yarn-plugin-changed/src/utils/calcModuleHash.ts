import { ListLogLine } from 'simple-git/typings/response'
import simpleGit from 'simple-git'
import path from 'path'
import { pathExists } from 'fs-extra'
import md5File from 'md5-file'
import { findGitRoot } from './GitUtil'

export interface ModuleHash {
  lastCommit: null | ListLogLine
  changed: string[]
}

export const git = simpleGit()

export async function getLastCommit(dir: string) {
  return (
    await git.log({
      file: path.resolve(dir),
    })
  ).latest
}

export async function getStatus(dir: string) {
  const gitRootPath = await findGitRoot(git, dir)
  return Promise.all(
    (await git.status([dir])).files.map(async (item) => {
      const realPath = path.resolve(gitRootPath, item.path)
      //TODO 这里有 bug，拼接路径有问题
      // console.log('getStatus: ', dir, gitRootPath, item.path, realPath)
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
export async function calcModuleHash(dir: string): Promise<ModuleHash> {
  const lastCommit = (
    await git.log({
      file: dir,
    })
  ).latest
  return {
    lastCommit,
    changed: await getStatus(dir),
  }
}

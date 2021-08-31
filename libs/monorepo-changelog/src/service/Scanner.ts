import simpleGit from 'simple-git'
import { BaseProgram } from './BaseProgram'
import { readJson } from 'fs-extra'
import path from 'path'
import { PackageJson } from 'type-fest'

export interface CommitLog {
  type: string
  scope?: string
  title: string
  hash: string
}
/**
 * 扫描当前模块所有的 git 记录
 */
export class Scanner extends BaseProgram {
  static parseMessage(message: string): Pick<CommitLog, 'type' | 'title'> {
    const regex = /(\w+)(\(.+\))?: (.*)/
    if (!regex.test(message)) {
      return {
        type: 'other',
        title: message,
      }
    }
    const [, type, , title] = regex.exec(message)!
    return { type, title }
  }

  async scan(from?: string): Promise<CommitLog[]> {
    // console.log('scan: ', from, this.cwd)
    const git = simpleGit()
    await git.cwd(this.cwd)
    const to = (await git.log({ file: this.cwd, maxCount: 1 })).latest!.hash
    const res = await git.log({
      file: this.cwd,
      from: from,
      to: to,
    })
    const json = (await readJson(
      path.resolve(this.cwd, 'package.json'),
    )) as PackageJson
    return res.all
      .map(
        (commit) =>
          ({
            ...Scanner.parseMessage(commit.message),
            hash: commit.hash,
            scope: json.name,
          } as CommitLog),
      )
      .filter((log) => log.type !== 'build')
  }
}

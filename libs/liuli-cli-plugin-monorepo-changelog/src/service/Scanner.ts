import simpleGit from 'simple-git'
import { BaseProgram } from './BaseProgram'

export interface CommitLog {
  type: string
  scope?: string
  title: string
  body?: string
}
/**
 * 扫描当前模块所有的 git 记录
 */
export class Scanner extends BaseProgram {
  static parseMessage(message: string): Omit<CommitLog, 'body'> {
    const regex = /(\w+)(\((.+)\))?: (.*)/
    if (!regex.test(message)) {
      return {
        type: 'other',
        title: message,
      }
    }
    const [, type, , scope, title] = regex.exec(message)!
    return { type, scope, title }
  }

  async scan(fromTag: string): Promise<CommitLog[]> {
    const git = simpleGit()
    await git.cwd(this.cwd)
    const res = await git.log({
      file: this.cwd,
      from: fromTag,
    })
    return res.all.map(
      (tag) =>
        ({
          ...Scanner.parseMessage(tag.message),
          body: tag.body,
        } as CommitLog),
    )
  }
}

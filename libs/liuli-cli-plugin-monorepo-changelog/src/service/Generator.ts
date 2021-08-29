import { CommitLog } from './Scanner'
import { BaseProgram } from './BaseProgram'

/**
 * 从 git 记录生成 changelog
 */
export class Generator extends BaseProgram {
  generate(logs: CommitLog[]): string {
    throw new Error('no impl')
  }
}

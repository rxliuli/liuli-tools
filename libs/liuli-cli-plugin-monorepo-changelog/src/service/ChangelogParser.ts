import { BaseProgram } from './BaseProgram'

interface Changelog {
  version: string
  content: string
}

/**
 * 解析现有的 changelog 以便能够根据版本写入到指定位置
 */
export class ChangelogParser extends BaseProgram {
  async parse(): Promise<Changelog[]> {
    throw new Error('no impl')
  }
}

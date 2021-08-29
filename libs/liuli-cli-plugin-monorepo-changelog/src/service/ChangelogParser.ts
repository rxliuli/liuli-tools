import { ChangeLogData, Generator } from './Generator'

/**
 * 解析现有的 changelog 以便能够根据版本写入到指定位置
 */
export class ChangelogParser {
  parse(changelog: string): ChangeLogData[] {
    return changelog
      .split('##')
      .slice(1)
      .map((item) => Generator.parse('##' + item))
  }
}

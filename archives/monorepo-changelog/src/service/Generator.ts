import { CommitLog } from './Scanner'
import { groupBy } from 'lodash'

export interface ChangeLogData {
  version: string
  hash?: string
  contents: string[]
}

/**
 * 从 git 记录生成 changelog
 */
export class Generator {
  static generate(changelog: ChangeLogData): string {
    return [
      `## ${changelog.version}`,
      ...(changelog.hash ? [`<!--hash:${changelog.hash}-->`] : []),
      changelog.contents.map((item) => '- ' + item).join('\n'),
    ].join('\n\n')
  }

  static parse(str: string): ChangeLogData {
    const lines = str.split('\n')
    const version = lines.find((line) => line.startsWith('## '))!.slice(3)
    const regex = /<!--hash:(\w+)-->/
    const hashRes = regex.exec(lines.find((line) => line.startsWith('<!--hash:'))!)!
    const contents = lines.filter((line) => line.startsWith('- ')).map((item) => item.slice(2))
    return { version, hash: hashRes?.[1], contents }
  }

  static convert(logs: CommitLog[], version: string): ChangeLogData {
    return {
      version,
      hash: logs[0].hash,
      contents: Object.entries(groupBy(logs, (item) => item.type))
        .flatMap(([, v]) => v)
        .map((item) => item.type + ': ' + item.title),
    }
  }

  static parseChangeLog(changeLog: string): ChangeLogData[] {
    return changeLog
      .split('##')
      .slice(1)
      .map((item) => Generator.parse('##' + item))
  }

  static stringifyChangeLog(changeLogDataList: ChangeLogData[]): string {
    return ['# CHANGELOG', ...changeLogDataList.map((item) => Generator.generate(item))].join('\n\n')
  }
}

import { pathExists, readFile, readJson, writeFile } from 'fs-extra'
import path from 'path'
import { BaseProgram } from '../service/BaseProgram'
import { PackageJson } from 'type-fest'
import { Scanner } from '../service/Scanner'
import { Generator } from '../service/Generator'

export class ChangelogProgram extends BaseProgram {
  async generate() {
    const changelogPath = path.resolve(this.cwd, 'CHANGELOG.md')
    if (!(await pathExists(changelogPath))) {
      console.log('CHANGELOG.md 文件不存在')
      return
    }
    const json = (await readJson(
      path.resolve(this.cwd, 'package.json'),
    )) as PackageJson
    const changelog = await readFile(
      path.resolve(this.cwd, 'CHANGELOG.md'),
      'utf-8',
    )
    const changeLogDataList = Generator.parseChangeLog(changelog)
    const scanner = new Scanner(this.cwd)

    //初始
    if (changeLogDataList.length === 0) {
      const commitLogs = await scanner.scan()
      const changeLogData = Generator.convert(commitLogs, json.version!)
      changeLogDataList.unshift(changeLogData)
    }
    //新增
    else if (changeLogDataList[0].version !== json.version) {
      const commitLogs = await scanner.scan(changeLogDataList[0].hash)
      const changeLogData = Generator.convert(commitLogs, json.version!)
      changeLogDataList.unshift(changeLogData)
    }
    //更新
    else {
      const commitLogs = await scanner.scan(changeLogDataList[1]?.hash)
      changeLogDataList[0] = Generator.convert(commitLogs, json.version!)
    }
    const txt =
      '# CHANGELOG\n\n' +
      changeLogDataList.map((item) => Generator.generate(item))
    await writeFile(changelogPath, txt)
  }
}

import { Scanner } from '../Scanner'
import * as path from 'path'
import { findParent } from '../../util/findParent'
import { pathExists } from 'fs-extra'
import simpleGit from 'simple-git'
import * as console from 'console'

describe('测试 Scanner', () => {
  let scanner: Scanner
  beforeAll(async () => {
    const cwd = await findParent(__dirname, (dir) => pathExists(path.resolve(dir, 'package.json')))
    scanner = new Scanner(cwd!)
  })

  it('测试 parseMessage', () => {
    expect(Scanner.parseMessage('chore: 引入 yarn version 插件')).toEqual({
      type: 'chore',
      title: '引入 yarn version 插件',
    })
    expect(Scanner.parseMessage('test(@liuli-util/yarn-plugin-changed): 添加单元测试')).toEqual({
      type: 'test',
      title: '添加单元测试',
    })
    expect(Scanner.parseMessage("Merge remote-tracking branch 'origin/dev'")).toEqual({
      type: 'other',
      title: "Merge remote-tracking branch 'origin/dev'",
    })
  })

  it('测试 scan', async () => {
    const commitLogs = await scanner.scan('4e77fbd3fb4e3ddc12808c2160337751c86958ba')
    console.log(commitLogs)
  })

  it('测试 simpleGit', async () => {
    const git = simpleGit()
    const modulePath = path.resolve('C:/Users/rxliuli/Code/Pkg/liuli-tools/libs/yarn-plugin-changed')
    git.cwd(modulePath)
    const last = (await git.log({ file: modulePath, maxCount: 1 })).latest

    const res = await git.log({
      file: modulePath,
      //from to 必须同时设置
      from: '586446ad046b3d5a4b3ad79c53777869131f5d4d',
      to: last!.hash,
    })
    console.log(res.all)
  })
})

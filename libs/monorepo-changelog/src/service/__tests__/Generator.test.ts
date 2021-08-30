import { Scanner } from '../Scanner'
import { findParent } from '../../util/findParent'
import { pathExists, readFile } from 'fs-extra'
import path from 'path'
import { Generator } from '../Generator'

describe('测试 Generator', () => {
  let scanner: Scanner
  let cwd: string
  beforeAll(async () => {
    cwd = (await findParent(__dirname, (dir) =>
      pathExists(path.resolve(dir, 'package.json')),
    ))!
    scanner = new Scanner(cwd!)
  })
  it('测试 generate', async () => {
    const commitLogs = await scanner.scan(
      '4e77fbd3fb4e3ddc12808c2160337751c86958ba',
    )

    const res = await Generator.convert(commitLogs, '0.1.0')
    console.log(res)
  })
  it('测试 parseChangeLog', async () => {
    const res = Generator.parseChangeLog(
      await readFile(path.resolve(cwd!, 'CHANGELOG.md'), 'utf-8'),
    )
    console.log(res)
  })
  it('测试 stringifyChangeLog', () => {
    const res = Generator.stringifyChangeLog([
      {
        hash: '4e77fbd3fb4e3ddc12808c2160337751c86958ba',
        version: '0.1.0',
        contents: [
          'feat: 初始化 @liuli-util/liuli-cli-plugin-monorepo-changelog 模块5',
        ],
      },
    ])
    console.log(res)
  })
})

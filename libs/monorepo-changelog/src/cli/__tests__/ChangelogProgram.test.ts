import { ChangelogProgram } from '../ChangelogProgram'
import { findParent } from '../../util/findParent'
import { pathExists } from 'fs-extra'
import path from 'path'

describe('测试 ChangelogProgram', () => {
  it('测试 generate', async () => {
    const cwd = await findParent(__dirname, (dir) =>
      pathExists(path.resolve(dir, 'package.json')),
    )
    const changelogProgram = new ChangelogProgram(cwd!)
    await changelogProgram.generate()
  })
})

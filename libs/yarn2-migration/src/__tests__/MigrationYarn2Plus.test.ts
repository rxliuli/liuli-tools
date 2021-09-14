import { MigrationYarn2Plus } from '../MigrationYarn2Plus'
import * as path from 'path'
import { mkdirp, remove } from 'fs-extra'
import { execPromise } from '../utils/execPromise'
import * as os from 'os'

describe('测试 MigrationYarn2Plus', () => {
  const testPath = path.resolve(os.homedir(), '.temp/test-demo')
  beforeEach(async () => {
    await remove(testPath)
    await mkdirp(testPath)
    await execPromise('yarn init -y', {
      cwd: testPath,
    })
  })
  const migrationYarn2Plus = new MigrationYarn2Plus({
    basePath: path.resolve(testPath),
  })
  it('基本示例', async () => {
    await migrationYarn2Plus.setVersion()
    await migrationYarn2Plus.updateYaml()
    await migrationYarn2Plus.updateGitIgnore()
    await migrationYarn2Plus.install()
  })
})

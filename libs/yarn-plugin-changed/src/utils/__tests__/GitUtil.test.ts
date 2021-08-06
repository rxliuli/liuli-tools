import * as path from 'path'
import { findGitRoot } from '../GitUtil'
import { git } from '../calcModuleHash'

describe('测试真实路径', () => {
  it('测试寻找根目录', async () => {
    const res = await findGitRoot(
      git,
      path.resolve(
        'C:\\Users\\rxliuli\\Code\\Pkg\\liuli-tools\\apps\\liuli-cli',
      ),
    )
    console.log(res)
  })
})

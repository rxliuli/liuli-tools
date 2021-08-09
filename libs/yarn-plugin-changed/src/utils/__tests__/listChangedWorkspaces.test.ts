import { npath } from '@yarnpkg/fslib'
import { Configuration, Project } from '@yarnpkg/core'
import { findGitRoot } from '../GitUtil'
import { git } from '../calcModuleHash'
import { listChangedWorkspaces } from '../listChangedWorkspaces'
import path from 'path'
import { remove, writeFile } from 'fs-extra'

describe('测试 listChangedWorkspaces', () => {
  const testFilePath = path.resolve(__dirname, 'test.create.json')
  beforeEach(() => writeFile(testFilePath, ''))
  afterEach(() => remove(testFilePath))
  it('基本示例', async () => {
    const dir = npath.toPortablePath(await findGitRoot(git, __dirname))
    const configuration = await Configuration.create(dir, dir)
    const { project } = await Project.find(configuration, dir)
    const workspace = await listChangedWorkspaces(project)
    expect(workspace.workspaces.length).toBeGreaterThan(1)
  })
})

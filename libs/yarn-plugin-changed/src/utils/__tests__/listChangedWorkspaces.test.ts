import { npath } from '@yarnpkg/fslib'
import { Configuration, Project } from '@yarnpkg/core'
import { findGitRoot } from '../GitUtil'
import { git } from '../calcModuleHash'
import { listChangedWorkspaces } from '../listChangedWorkspaces'
import path from 'path'
import { remove, writeFile } from 'fs-extra'

describe('测试 listChangedWorkspaces', () => {
  let project: Project
  beforeAll(async () => {
    const dir = npath.toPortablePath(await findGitRoot(git, __dirname))
    const configuration = await Configuration.create(dir, dir)
    project = (await Project.find(configuration, dir)).project
  })
  describe('基本示例', () => {
    const testFilePath = path.resolve(__dirname, 'test.create.json')
    beforeEach(() => writeFile(testFilePath, ''))
    afterEach(() => remove(testFilePath))
    it('测试 build', async () => {
      const { workspaces } = await listChangedWorkspaces(project, 'build')
      expect(workspaces.length).toBeGreaterThan(1)
    })
  })
  it('测试不同的命令缓存', async () => {
    const { updateCache } = await listChangedWorkspaces(project, 'list')
    await updateCache()
    expect(
      (await listChangedWorkspaces(project, 'list')).workspaces.length,
    ).toBe(0)
  })
})

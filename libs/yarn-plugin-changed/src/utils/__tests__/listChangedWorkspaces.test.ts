import { npath } from '@yarnpkg/fslib'
import { Configuration, Project } from '@yarnpkg/core'
import { listChangedWorkspaces } from '../listChangedWorkspaces'
import path from 'path'
import { remove, writeFile } from 'fs-extra'
import { findGitRoot } from '../GitUtil'
import { git } from '../calcModuleHash'

export async function getYarnProject(dir: string): Promise<Project> {
  const portablePath = npath.toPortablePath(path.resolve(dir))
  const configuration = await Configuration.create(portablePath, portablePath)
  return (await Project.find(configuration, portablePath)).project
}

describe('测试 listChangedWorkspaces', () => {
  let project: Project
  beforeAll(async () => {
    project = await getYarnProject(await findGitRoot(git, __dirname))
  })
  describe('基本示例', () => {
    const testFilePath = path.resolve(__dirname, 'test.create.json')
    beforeEach(() => writeFile(testFilePath, ''))
    afterEach(() => remove(testFilePath))
    it('测试 build', async () => {
      const { workspaces } = await listChangedWorkspaces({
        project: project,
        cmd: 'initialize',
      })
      expect(workspaces.length).toBeGreaterThan(1)
    })
  })
  it('测试更新缓存', async () => {
    const { updateCache } = await listChangedWorkspaces({
      project: project,
      cmd: 'list',
    })
    await updateCache()
    const { workspaces } = await listChangedWorkspaces({
      project: project,
      cmd: 'list',
    })
    expect(workspaces.length).toBe(0)
  }, 10_000)
})

it('测试真实的项目', async () => {
  const project = await getYarnProject('C:/Users/rxliuli/Code/company/matrix')
  const res = await listChangedWorkspaces({
    project: project,
    cmd: 'initialize',
  })
  console.log(res)
})

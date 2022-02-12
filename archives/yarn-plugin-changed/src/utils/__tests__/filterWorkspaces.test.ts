import { filterWorkspaces } from '../filterWorkspaces'
import { findGitRoot } from '../GitUtil'
import simpleGit from 'simple-git'
import { getYarnProject } from './listChangedWorkspaces.test'
import { Workspace } from '@yarnpkg/core'

describe('测试 filterWorkspaces', () => {
  let workspaces: Workspace[]
  beforeAll(async () => {
    const rootPath = await findGitRoot(simpleGit(), __dirname)
    workspaces = (await getYarnProject(rootPath)).workspaces
  })
  it('测试什么都不做', () => {
    expect(filterWorkspaces({ workspaces })).toEqual(workspaces)
  })
  const modules = ['@liuli-util/i18next-dts-gen']
  it('测试排除', () => {
    const res = filterWorkspaces({ workspaces, exclude: modules })
    expect(workspaces.length - res.length).toBe(modules.length)
  })
  it('测试包含', async () => {
    const res = filterWorkspaces({ workspaces, include: modules })
    expect(res.length).toBe(modules.length)
  })
})

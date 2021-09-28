import { Configuration, Project } from '@yarnpkg/core'
import { npath } from '@yarnpkg/fslib'
import path from 'path'
import simpleGit, { Options } from 'simple-git'
import { pathExists, readJson } from 'fs-extra'
import { PackageJson } from 'type-fest'

export async function findParent(
  cwd: string,
  predicate: (dir: string) => Promise<boolean>,
): Promise<string | null> {
  if (await predicate(cwd)) {
    return cwd
  }
  const parent = path.dirname(cwd)
  if (parent === cwd) {
    return null
  }
  return findParent(parent, predicate)
}

export async function getYarnProject(dir: string): Promise<Project> {
  const portablePath = npath.toPortablePath(path.resolve(dir))
  const configuration = await Configuration.create(portablePath, portablePath)
  return (await Project.find(configuration, portablePath)).project
}

async function getRootPath() {
  return await findParent(__dirname, async (dir) => {
    const pkgPath = path.resolve(dir, 'package.json')
    return (
      (await pathExists(pkgPath)) &&
      !!((await readJson(pkgPath)) as PackageJson).workspaces
    )
  })
}

describe('测试 @yarn/core', () => {
  let project: Project
  beforeAll(async () => {
    const rootPath = (await getRootPath())!
    project = await getYarnProject(rootPath)
  })
  it('测试获取真实路径', () => {
    console.log(npath.fromPortablePath(project.workspaces[1].cwd))
  })
})

it('测试 git 读取 json', async () => {
  const git = simpleGit()
  const rootPath = (await getRootPath())!
  //TODO 此处无法读取
  const res = await git.show({
    include:
      './' + path.relative(rootPath, path.resolve(rootPath, 'package.json')),
    shebang: '61134a3fe0dd467b5e30b5d63fdd601a8d4206cc',
  } as Options)
  console.log(res)
})

describe('测试 listChangedModule', () => {
  it('基本示例', () => {
    console.log()
  })
})

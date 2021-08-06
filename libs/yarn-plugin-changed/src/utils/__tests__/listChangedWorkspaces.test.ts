import { npath, PortablePath } from '@yarnpkg/fslib'
import { Configuration, Project } from '@yarnpkg/core'

const getConfiguration = (p: PortablePath) => {
  return Configuration.create(p, p)
}

it('测试 listChangedWorkspaces', async () => {
  const dir = npath.toPortablePath(
    'C:/Users/rxliuli/Code/Pkg/yarn-plugins/packages/changed',
  )
  console.log(dir)

  const configuration = await getConfiguration(dir)
  const { project } = await Project.find(configuration, dir)
  console.log(project)
})

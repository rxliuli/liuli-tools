import simpleGit, { SimpleGit } from 'simple-git'
import * as path from 'path'
import { mkdirp, remove } from 'fs-extra'
import * as os from 'os'

describe.skip('测试 simple-git', () => {
  async function getOriginRemote() {
    const git = simpleGit()
    const remotes = await git.getRemotes(true)
    return remotes.find((item) => item.name === 'origin')
  }
  let git: SimpleGit
  const tempPath = path.resolve(__dirname, '.temp')
  beforeEach(async () => {
    git = simpleGit()
    await remove(tempPath)
    await mkdirp(tempPath)
  })
  it('测试获取当前项目的远端地址', async () => {
    const originRemote = await getOriginRemote()
    console.log('git.getRemotes', originRemote)
    expect(originRemote).not.toBeUndefined()
  })
  it('克隆项目', async () => {
    const originRemote = (await getOriginRemote())!
    console.log('获取当前项目远端配置: ', originRemote)
    const originRepoName = originRemote.refs.fetch.replace(new RegExp('[/:]', 'g'), '_')
    await git.clone(originRemote.refs.fetch, path.resolve(tempPath, originRepoName), { '--branch': 'gh-pages' })
  }, 100_000)
  it('测试 git status', async () => {
    await git.add('-A')
    const status = await git.status()
    console.log('status: ', status.files)
  })
})

describe.skip('测试真实场景', () => {
  const gitPath = path.resolve(
    os.homedir(),
    './AppData/Local/liuli-cli/Cache/gh-pages/https___github.com_rxliuli_webos.git',
  )
  let git: SimpleGit
  beforeAll(() => {
    git = simpleGit(gitPath)
  })
  it('测试获取提交状态', async () => {
    const res = await git.status()
    console.log(res)
  })
  it('测试获取更新', async () => {
    const res = await git.pull()
    console.log(res)
  }, 100_000)
  it('测试 git add -A', async () => {
    await git.add('-A')
  })
})

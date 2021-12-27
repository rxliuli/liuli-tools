import { EventExtPromise, PromiseUtil } from './util/PromiseUtil'
import Client, { ConnectOptions } from 'ssh2-sftp-client'
import * as path from 'path'
import * as os from 'os'
import { copy, mkdirp, pathExists, readFile } from 'fs-extra'
import Ajv from 'ajv'
import localize from 'ajv-i18n/localize'
import simpleGit from 'simple-git'
import { nodeCacheDir } from '../../utils/nodeCacheDir'
import Conf from 'conf'
import { wait } from './util/wait'

export interface DeployEvents {
  process(title: string): void
}

/**
 * 使用 ajv 校验数据
 * @param schema
 * @param data
 */
function ajvValidate(schema: object, data: object): [isValid: boolean, errorText: string] {
  const ajv = new Ajv({ allErrors: true, messages: false })
  const res = ajv.validate(schema, data)
  if (!res) {
    localize.zh(ajv.errors)
  }
  return [res, ajv.errorsText()]
}

/**
 * 部署服务接口
 */
export interface IDeployService {
  validate(): [isValidate: boolean, errorText: string]
  /**
   * 部署
   */
  deploy(): EventExtPromise<void, DeployEvents>
}

export enum DeployTypeEnum {
  GhPages = 'gh-pages',
  Sftp = 'sftp',
}

export interface BaseDeployOptions {
  cwd: string
  type: DeployTypeEnum
}

export type SftpDeployOptions = Omit<BaseDeployOptions, 'type'> & {
  dest: string
  remote: string
  sshConfig: ConnectOptions
}

/**
 * sftp 集成到远端
 */
export class SftpDeployService implements IDeployService {
  constructor(private readonly options: SftpDeployOptions) {}

  deploy(): EventExtPromise<void, DeployEvents> {
    return PromiseUtil.wrapOnEvent(async () => {
      const client = new Client()
      const privateKey = await readFile(path.resolve(os.userInfo().homedir, '.ssh/id_rsa'), 'utf-8')
      await client.connect({
        ...this.options.sshConfig,
        privateKey,
      })
      await client.mkdir(this.options.remote, true)
      await client.uploadDir(path.resolve(this.options.cwd, this.options.dest), this.options.remote)
      await client.end()
    })
  }

  validate(): [isValidate: boolean, errorText: string] {
    return ajvValidate(
      {
        type: 'object',
        properties: {
          cwd: { type: 'string' },
          dest: { type: 'string' },
          remote: { type: 'string' },
          sshConfig: {
            type: 'object',
            properties: {
              host: { type: 'string' },
              username: { type: 'string' },
            },
          },
        },
        required: ['cwd', 'dest', 'remote', 'sshConfig'],
      },
      this.options,
    )
  }
}

export type GhPagesDeployOptions = Omit<BaseDeployOptions, 'type'> & {
  dest: string
  remote: string
}

/**
 * 将本地静态资源推送到 gh-pages 远端
 */
export class GhPagesDeployService implements IDeployService {
  constructor(private readonly options: GhPagesDeployOptions) {}

  readonly conf = new Conf<{ lock: boolean }>({ projectName: '@liuli-util/cli' })

  deploy(): EventExtPromise<void, DeployEvents> {
    const defaultRemote = 'origin'
    const defaultBranch = 'gh-pages'
    return PromiseUtil.wrapOnEvent(async (events: DeployEvents) => {
      events.process('开始推送')
      const git = simpleGit(this.options.cwd)
      events.process('获取当前项目的远端配置')
      const originRemote = (await git.getRemotes(true)).find((item) => item.name === defaultRemote)
      if (!originRemote) {
        throw new Error('当前目录不是一个 git 项目或没有配置 git remote')
      }
      const ghPagesRoot = path.resolve(nodeCacheDir('liuli-cli'), 'gh-pages')
      const originRepoName = originRemote.refs.fetch.replace(new RegExp('[/:]', 'g'), '_')

      // console.log('this.conf.get(originRepoName): ', this.conf.get(originRepoName))
      if (this.conf.get(originRepoName)) {
        console.log('其他位置正在推送这个项目，请等待...')
        await wait(() => {
          const isUnlock = !this.conf.store.lock
          if (isUnlock) {
            this.conf.set(originRepoName, true)
          }
          return isUnlock
        })
      } else {
        this.conf.set(originRepoName, true)
      }

      try {
        const localRepoPath = path.resolve(ghPagesRoot, originRepoName)
        if (!(await pathExists(localRepoPath))) {
          events.process('克隆项目')
          await git.clone(originRemote.refs.fetch, localRepoPath, { '--branch': defaultBranch })
        } else {
          await git.pull()
        }
        events.process('复制文件')
        const remoteDestPath = path.join(localRepoPath, this.options.remote)
        await mkdirp(remoteDestPath)
        await copy(path.resolve(this.options.cwd, this.options.dest), remoteDestPath)
        events.process('推送到远端')
        await git.cwd(localRepoPath)
        await git.add('-A')
        await git.commit('Updates gh-pages by liuli-cli')
        await git.push(defaultRemote, defaultBranch)
        events.process('完成推送')
      } finally {
        this.conf.set(originRepoName, false)
      }
    })
  }

  validate(): [isValid: boolean, errorText: string] {
    return ajvValidate(
      {
        type: 'object',
        properties: {
          cwd: { type: 'string' },
          dest: { type: 'string' },
          remote: { type: 'string' },
        },
        required: ['cwd', 'dest', 'remote'],
      },
      this.options,
    )
  }
}

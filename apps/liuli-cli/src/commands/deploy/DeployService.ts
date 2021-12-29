import { EventExtPromise, PromiseUtil } from './util/PromiseUtil'
import Client, { ConnectOptions } from 'ssh2-sftp-client'
import * as path from 'path'
import * as os from 'os'
import { copy, mkdirp, pathExists, readFile } from 'fs-extra'
import Ajv from 'ajv'
import localize from 'ajv-i18n/localize'
import simpleGit from 'simple-git'
import { nodeCacheDir } from '../../utils/nodeCacheDir'
import { performance, PerformanceObserver } from 'perf_hooks'

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
  debug: boolean
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

  deploy(): EventExtPromise<void, DeployEvents> {
    const defaultRemote = 'origin'
    const defaultBranch = 'gh-pages'
    return PromiseUtil.wrapOnEvent(async (events: DeployEvents) => {
      const obs = new PerformanceObserver((perfObserverList, observer) => {
        if (this.options.debug) {
          console.log(perfObserverList.getEntries())
        }
      })
      obs.observe({ type: 'mark' })

      function mark(title: string) {
        performance.mark(title)
        events.process(title)
      }
      mark('开始推送')
      const git = simpleGit(this.options.cwd)
      mark('获取当前项目的远端配置')
      const originRemote = (await git.getRemotes(true)).find((item) => item.name === defaultRemote)
      if (!originRemote) {
        throw new Error('当前目录不是一个 git 项目或没有配置 git remote')
      }
      const ghPagesRoot = path.resolve(nodeCacheDir('liuli-cli'), 'gh-pages')
      const originRepoName = originRemote.refs.fetch.replace(new RegExp('[/:]', 'g'), '_')
      const localRepoPath = path.resolve(ghPagesRoot, originRepoName)
      if (!(await pathExists(localRepoPath))) {
        mark('克隆项目')
        await git.clone(originRemote.refs.fetch, localRepoPath, { '--branch': defaultBranch })
      } else {
        mark('更新项目')
        await git.pull()
      }
      mark('复制文件')
      const remoteDestPath = path.join(localRepoPath, this.options.remote)
      await mkdirp(remoteDestPath)
      await copy(path.resolve(this.options.cwd, this.options.dest), remoteDestPath)
      mark('推送到远端')
      await git.cwd(localRepoPath)
      await git.add('-A')
      if ((await git.status()).files.length !== 0) {
        await git.commit('Updates gh-pages by liuli-cli')
        await git.push(defaultRemote, defaultBranch)
      }
      mark('完成推送')
      obs.disconnect()
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

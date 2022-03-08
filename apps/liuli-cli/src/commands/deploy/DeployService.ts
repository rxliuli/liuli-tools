import { EventExtPromise, PromiseUtil } from './util/PromiseUtil'
import Client, { ConnectOptions } from 'ssh2-sftp-client'
import * as path from 'path'
import * as os from 'os'
import { copy, mkdirp, pathExists, readFile } from 'fs-extra'
import simpleGit from 'simple-git'
import { nodeCacheDir } from '../../utils/nodeCacheDir'
import { performance, PerformanceObserver } from 'perf_hooks'
import { validate } from './util/validate'

export interface DeployEvents {
  process(title: string): void
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

export interface SftpDeployOptions extends Omit<BaseDeployOptions, 'type'> {
  dist: string
  dest: string
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
      await client.mkdir(this.options.dest, true)
      await client.uploadDir(path.resolve(this.options.cwd, this.options.dist), this.options.dest)
      await client.end()
    })
  }

  validate(): [isValidate: boolean, errorText: string] {
    return validate<SftpDeployOptions>(
      {
        type: 'object',
        properties: {
          debug: { type: 'boolean' },
          cwd: { type: 'string' },
          dist: { type: 'string' },
          dest: { type: 'string' },
          sshConfig: {
            type: 'object',
            properties: {
              host: { type: 'string' },
              username: { type: 'string' },
            },
          } as any,
        },
        required: ['cwd', 'dist', 'dest', 'sshConfig', 'debug'],
      },
      this.options,
    )
  }
}

export interface GhPagesDeployOptions extends Omit<BaseDeployOptions, 'type'> {
  /**
   * 推送的本地目录
   */
  dist: string
  /**
   * 推送的远端目录，默认为分支根目录
   */
  dest?: string
  /**
   * 推送的项目 git 地址，默认为当前项目
   */
  repo?: string
  /**
   * 推送的远端，默认为 origin
   */
  remote?: string
  /**
   * 远端分支名，默认为 gh-pages
   */
  branch?: string
}

/**
 * 将本地静态资源推送到 gh-pages 远端
 */
export class GhPagesDeployService implements IDeployService {
  constructor(private readonly options: GhPagesDeployOptions) {}

  deploy(): EventExtPromise<void, DeployEvents> {
    const defaultRemote = this.options.remote ?? 'origin'
    const defaultBranch = this.options.branch ?? 'gh-pages'
    return PromiseUtil.wrapOnEvent(async (events: DeployEvents) => {
      const obs = new PerformanceObserver((perfObserverList) => {
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
      if (!this.options.repo) {
        mark('获取当前项目的远端配置')
        const originRemote = (await git.getRemotes(true)).find((item) => item.name === defaultRemote)
        if (!originRemote) {
          throw new Error('当前目录不是一个 git 项目或没有配置 git remote')
        }
        this.options.repo = originRemote.refs.fetch
      }
      const ghPagesRoot = path.resolve(nodeCacheDir('liuli-cli'), 'gh-pages')
      const originRepoName = this.options.repo.replace(new RegExp('[/:]', 'g'), '_')
      const localRepoPath = path.resolve(ghPagesRoot, originRepoName)
      let forcePush = false
      if (!(await pathExists(localRepoPath))) {
        mark('克隆项目')
        //如果失败，应该尝试克隆主分支，然后 checkout
        try {
          await git.clone(this.options.repo, localRepoPath, {
            '--branch': defaultBranch,
            '--single-branch': null,
            '--depth': 1,
          })
        } catch (e) {
          mark(`未找到 ${defaultBranch} 分支，尝试自动创建`)
          await git.clone(this.options.repo, localRepoPath, {
            '--single-branch': null,
            '--depth': 1,
          })
          await git.cwd(localRepoPath)
          await git.checkout({
            '--orphan': defaultBranch,
          })
          forcePush = true
        }
      } else {
        await git.cwd(localRepoPath)
        mark('更新项目')
        await git.pull(defaultRemote, defaultBranch, {
          '--allow-unrelated-histories': null,
        })
      }
      mark('复制文件')
      const remoteDestPath = path.join(localRepoPath, this.options.dest ?? './')
      await mkdirp(remoteDestPath)
      await copy(path.resolve(this.options.cwd, this.options.dist), remoteDestPath)
      mark('提交所有文件')
      await git.cwd(localRepoPath)
      await git.add('-A')
      if ((await git.status()).files.length === 0) {
        mark('没有任何提交，跳过提交')
      } else {
        await git.commit('Updates gh-pages by liuli-cli')
      }
      mark('推送到远端')
      await git.push(defaultRemote, defaultBranch)
      mark('完成推送')
      obs.disconnect()
    })
  }

  validate(): [isValid: boolean, errorText: string] {
    return validate<GhPagesDeployOptions>(
      {
        type: 'object',
        properties: {
          debug: { type: 'boolean' },
          cwd: { type: 'string' },
          dist: { type: 'string' },
          dest: { type: 'string', nullable: true },
          repo: { type: 'string', nullable: true },
          remote: { type: 'string', nullable: true },
          branch: { type: 'string', nullable: true },
        },
        required: ['debug', 'cwd', 'dist'],
      },
      this.options,
    )
  }
}

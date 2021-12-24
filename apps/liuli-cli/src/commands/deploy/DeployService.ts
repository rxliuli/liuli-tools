import { EventExtPromise, PromiseUtil } from './util/PromiseUtil'
import Client, { ConnectOptions } from 'ssh2-sftp-client'
import * as path from 'path'
import * as os from 'os'
import { readFile } from 'fs-extra'
import Ajv from 'ajv'
import localize from 'ajv-i18n/localize'

export interface DeployEvents {
  process(options: { rate: number; all: number; title: string }): void
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

/**
 * 将本地静态资源推送到 gh-pages 远端
 */
export class GhPagesDeployService implements IDeployService {
  readonly type = DeployTypeEnum.GhPages

  deploy(): EventExtPromise<void, DeployEvents> {
    return PromiseUtil.wrapOnEvent(async () => {
      throw new Error('no impl')
    })
  }

  validate(): [isValidate: boolean, errorText: string] {
    return [false, '']
  }
}

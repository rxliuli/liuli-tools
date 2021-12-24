import {
  BaseDeployOptions,
  DeployTypeEnum,
  GhPagesDeployService,
  IDeployService,
  SftpDeployOptions,
  SftpDeployService,
} from './DeployService'
import * as path from 'path'
import { pathExists, readJson } from 'fs-extra'

async function getOptions(cwd: string): Promise<BaseDeployOptions> {
  const pkgJsonPath = path.resolve(cwd, 'package.json')
  if (await pathExists(pkgJsonPath)) {
    const config = (await readJson(pkgJsonPath)).deploy
    if (!config) {
      throw new Error('找不到配置')
    }
    return config
  }
  throw new Error('找不到配置')
}

export async function deploy(options: Omit<BaseDeployOptions, 'type'>): Promise<void> {
  const deployOptions = await getOptions(options.cwd)
  let service: IDeployService
  const _options = {
    ...options,
    ...deployOptions,
  } as unknown as SftpDeployOptions
  switch (deployOptions.type) {
    case DeployTypeEnum.Sftp:
      service = new SftpDeployService(_options)
      break
    case DeployTypeEnum.GhPages:
      service = new GhPagesDeployService(_options)
      break
    default:
      throw new Error('未知的部署预设类型 ' + deployOptions.type)
  }
  const [isValidate, errorText] = service.validate()
  if (!isValidate) {
    throw new Error(errorText)
  }
  await service.deploy().on('process', (title) => {
    console.info(title)
  })
}

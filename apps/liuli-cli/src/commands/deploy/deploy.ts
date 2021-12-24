import {
  BaseDeployOptions,
  DeployTypeEnum,
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

export async function deploy(options: Omit<BaseDeployOptions, 'type'>) {
  const deployOptions = await getOptions(options.cwd)
  let service: IDeployService
  switch (deployOptions.type) {
    case DeployTypeEnum.Sftp:
      service = await new SftpDeployService({
        ...options,
        ...deployOptions,
      } as unknown as SftpDeployOptions)
      break
    default:
      throw new Error('未知的部署预设类型 ' + deployOptions.type)
  }
  const [isValidate, errorText] = service.validate()
  if (!isValidate) {
    throw new Error(errorText)
  }
  await service.deploy().on('process', (info) => {
    console.info(`[${info.rate}/${info.all}] ${info.title}`)
  })
}

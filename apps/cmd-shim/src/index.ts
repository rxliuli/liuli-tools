import path from 'path'
import cmdShim from 'cmd-shim'
import { PackageJson } from 'type-fest'

export interface BinConfig {
  name: string
  path: string
}

function getBinName(name: string) {
  if (!name.includes('/')) {
    return name
  }
  return name.split('/')[1]
}

/**
 * 读取所有的二进制文件
 * @param base
 * @param pkgJson
 */
export function readBinList(base: string, pkgJson: PackageJson): BinConfig[] {
  const bin = pkgJson.bin
  if (!bin) {
    return []
  }
  if (typeof bin === 'string') {
    return [
      {
        name: getBinName(pkgJson.name!),
        path: path.resolve(base, bin),
      },
    ]
  }
  return Object.entries(bin).map(([k, v]) => ({
    name: k,
    path: path.isAbsolute(v) ? v : path.resolve(base, v),
  }))
}

/**
 * 链接 nodejs cli 到全局
 * @param globalBinPath
 * @param config
 */
export async function linkGlobalBin(globalBinPath: string, config: BinConfig) {
  await (cmdShim as any)(
    path.resolve(config.path),
    path.resolve(globalBinPath, config.name),
  )
}

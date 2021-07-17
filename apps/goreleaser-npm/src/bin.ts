import { Command } from 'commander'
import * as path from 'path'
import {
  mkdir,
  mkdirp,
  pathExists,
  readJson,
  remove,
  writeFile,
} from 'fs-extra'
import { PackageJson } from 'type-fest'
import * as os from 'os'
import fetch from 'node-fetch'
import { extract } from 'tar'

// Mapping from Node's `process.arch` to Golang's `$GOARCH`
const ArchMap = {
  x64: 'x86_64',
  arm64: 'arm64',
  x32: 'i386',
} as Record<string, string>

// Mapping between Node's `process.platform` to Golang's
const PlatformMap = {
  win32: 'Windows',
  linux: 'Linux',
  darwin: 'Darwin',
} as Record<string, string>

interface GoBin {
  name: string
  version?: string
  url: string
}

/**
 * 解析 json
 */
export async function parsePackageJson(): Promise<
  GoBin & Pick<PackageJson, 'version'>
> {
  const json = (await readJson(path.resolve('package.json'))) as PackageJson & {
    goBin: GoBin
  }
  if (os.platform() === 'win32') {
    json.goBin.name += '.exe'
  }
  let version = (json.goBin.version ?? json.version)!
  if (json.version!.startsWith('v')) {
    version = version.substr(1)
  }
  json.goBin.url = json.goBin.url
    .replace(new RegExp('{{arch}}', 'g'), ArchMap[os.arch()])
    .replace(new RegExp('{{platform}}', 'g'), PlatformMap[os.platform()])
    .replace(new RegExp('{{version}}', 'g'), version)
  return {
    ...json.goBin,
    version,
  }
}

async function install() {
  const cfg = await parsePackageJson()
  //init
  const tempDir = path.resolve('./.cache/')
  if (await pathExists(tempDir)) {
    return
  }
  const zipPath = path.resolve(`./test.tar.gz`)
  await Promise.all([remove(tempDir), remove(tempDir)])
  await mkdirp(path.dirname(zipPath))
  //download
  const resp = await fetch(cfg.url)
  if (!resp.ok) {
    console.error('下载失败: ', resp.status, cfg.url)
    return
  }
  await writeFile(zipPath, await resp.buffer())
  //extract
  await mkdir(tempDir)
  await extract({
    file: zipPath,
    cwd: tempDir,
  })
  //clean
  await remove(zipPath)
}

async function uninstall() {
  const tempDir = path.resolve('.cache/')
  await remove(tempDir)
}

new Command()
  .addCommand(new Command('install').description('安装脚本').action(install))
  .addCommand(
    new Command('uninstall').description('卸载脚本').action(uninstall),
  )
  .parse()

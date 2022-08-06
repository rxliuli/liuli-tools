import path from 'path'
import cmdShim from 'cmd-shim'
import { writeFile } from 'fs-extra'
import { execPromise } from '../utils/execPromise'

it.skip('测试 cmdShim', async () => {
  const globalBinPath = ((await execPromise('npm -g bin')) as string).trimEnd()
  await writeFile(path.resolve(globalBinPath, 'test'), 'test')
  await cmdShim(path.resolve('dist/bin.js'), path.resolve(globalBinPath, 'cmd-link-global'))
})

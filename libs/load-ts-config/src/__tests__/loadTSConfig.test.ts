import { bundleTSConfig, evalConfig, loadTSConfig } from '../loadTSConfig'
import * as path from 'path'

describe('测试 loadTSConfig', () => {
  it('测试 bundleTSConfig', async () => {
    const configFilePath = await bundleTSConfig(
      path.resolve(__dirname, 'temp/rollup.config.ts'),
      path.resolve(__dirname, 'temp'),
    )
    console.log(configFilePath)
  })
  it('测试 evalConfig', async () => {
    const config = await evalConfig(
      path.resolve(__dirname, 'temp/rollup.config.ts.js'),
    )
    console.log('config: ', config)
  })
  it('测试 loadTSConfig', async () => {
    const start = Date.now()
    const config = await loadTSConfig(
      path.resolve(__dirname, 'temp/rollup.config.ts'),
      path.resolve(__dirname, 'temp'),
    )
    const end = Date.now()
    console.log('config: ', config, ', ms: ', end - start)
  })
})

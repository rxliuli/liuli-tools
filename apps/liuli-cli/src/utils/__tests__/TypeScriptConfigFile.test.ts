import * as path from 'path'
import { TypeScriptConfigFile } from '../TypeScriptConfigFile'

describe('测试 loadTSConfig', () => {
  const typeScriptConfigFile = new TypeScriptConfigFile({
    configFile: path.resolve(__dirname, 'temp/rollup.config.ts'),
    configRoot: path.resolve(__dirname, 'temp'),
  })
  it('测试 bundle', async () => {
    const configFilePath = await typeScriptConfigFile.bundle()
    console.log(configFilePath)
  })
  it('测试 evalConfig', async () => {
    const config = await TypeScriptConfigFile.evalConfig(
      path.resolve(__dirname, 'temp/rollup.config.ts.js'),
    )
    console.log('config: ', config)
  })
  it('测试 load', async () => {
    const start = Date.now()
    const config = await typeScriptConfigFile.load()
    const end = Date.now()
    console.log('config: ', JSON.stringify(config), ', ms: ', end - start)
  })
})

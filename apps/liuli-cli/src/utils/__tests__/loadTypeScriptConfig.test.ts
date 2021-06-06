import * as path from 'path'
import { loadTypeScriptConfig } from '../loadTypeScriptConfig'

it('测试 loadTypeScriptConfig', () => {
  const start = Date.now()
  const config = loadTypeScriptConfig(
    path.resolve(__dirname, './test.config.ts'),
  )
  const end = Date.now()
  console.log('config: ', JSON.stringify(config), ', ms: ', end - start)
})

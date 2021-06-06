import * as path from 'path'
import { loadTypeScriptConfig } from '../loadTypeScriptConfig'

it('测试 loadTypeScriptConfig', () => {
  const start = Date.now()
  const res = loadTypeScriptConfig(path.resolve(__dirname, './test.config.ts'))
  const end = Date.now()
  // expect(res.default).toEqual(config)
  console.log('config: ', JSON.stringify(res), ', ms: ', end - start)
})

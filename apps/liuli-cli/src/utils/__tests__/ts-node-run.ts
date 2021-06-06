import path from 'path'
import { loadTypeScriptConfig } from '../loadTypeScriptConfig'

console.log(loadTypeScriptConfig(path.resolve(__dirname, 'test.config.ts')))

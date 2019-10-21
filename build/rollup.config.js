// IIFE 格式将在下个大版本中废弃，还是使用 umd 吧
import iife from './rollup.config.iife'
import dev from './rollup.config.dev'
import es from './rollup.config.es'
import prod from './rollup.config.prod'

export default [iife, es, dev, prod]

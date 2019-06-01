import iife from './rollup.config.iife'
import dev from './rollup.config.dev'
import es from './rollup.config.es'
import prod from './rollup.config.prod'

export default [iife, es, dev, prod]

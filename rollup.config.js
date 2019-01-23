import dev from './rollup.config.dev'
import prod from './rollup.config.prod'

export default (process.env.NODE_ENV === 'production' ? prod : dev)

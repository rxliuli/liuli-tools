import dev from './rollup.config.dev'
import prod from './rollup.config.prod'

// 如果当前环境时 production，则使用 prod 配置，否则使用 dev 配置
export default (process.env.NODE_ENV === 'production' ? prod : dev)

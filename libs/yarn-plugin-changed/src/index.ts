import { Plugin } from '@yarnpkg/core'
import { ChangedForeachCommand, ChangedListCommand } from './commands'

const plugin: Plugin = {
  commands: [ChangedListCommand, ChangedForeachCommand],
}

export default plugin

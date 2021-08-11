import { Plugin } from '@yarnpkg/core'
import { ChangedListCommand } from './commands/ChangedListCommand'
import { ChangedForeachCommand } from './commands/ChangedForeachCommand'

const plugin: Plugin = {
  commands: [ChangedListCommand, ChangedForeachCommand],
}

export default plugin

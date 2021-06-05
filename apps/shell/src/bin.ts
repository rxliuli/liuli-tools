import { Command } from 'commander'
import { copyCmd, mkdirCmd, moveCmd, removeCmd } from './lib'

new Command()
  .addCommand(removeCmd)
  .addCommand(copyCmd)
  .addCommand(moveCmd)
  .addCommand(mkdirCmd)
  .parse()

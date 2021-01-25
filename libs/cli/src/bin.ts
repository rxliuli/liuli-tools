import { Command } from 'commander'
import { builder } from './builder'
import { cleaner } from './cleaner'
import { tester } from './tester'
import { addCliBanner } from './addCliBanner'

const main = new Command()
main
  .addCommand(builder)
  .addCommand(cleaner)
  .addCommand(tester)
  .addCommand(addCliBanner)
  .parse()

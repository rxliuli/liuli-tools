import { Command } from 'commander'
import path from 'path'
import { ChangelogProgram } from './cli/ChangelogProgram'

new Command('changelog')
  .action(async () => {
    const changelogProgram = new ChangelogProgram(path.resolve())
    await changelogProgram.generate()
  })
  .parse()

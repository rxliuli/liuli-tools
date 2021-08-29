import { Command } from 'commander'
import { ChangelogProgram } from './cli/ChangelogProgram'
import path from 'path'

export * from './service/Generator'
export * from './service/Scanner'
export * from './cli/ChangelogProgram'

export const changelogCommand = new Command('changelog').action(async () => {
  const changelogProgram = new ChangelogProgram(path.resolve())
  await changelogProgram.generate()
})

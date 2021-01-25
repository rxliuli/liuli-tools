import { Command } from 'commander'
import { pathExists, remove } from 'fs-extra'
import * as path from 'path'

const cleaner = new Command('clean')

cleaner.description('清理').action(async () => {
  const distPath = path.resolve('./dist')
  if (await pathExists(distPath)) {
    await remove(distPath)
  }
})

export { cleaner }

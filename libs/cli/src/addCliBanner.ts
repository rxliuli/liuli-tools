import { Command } from 'commander'
import { readFile, writeFile } from 'fs-extra'

const addCliBanner = new Command('addCliBanner')
addCliBanner.description('为 cli 添加 banner').action(async () => {
  const filePath = './dist/bin.js'
  const options = {
    encoding: 'utf-8',
  }
  const content = '#!/usr/bin/env node\n' + (await readFile(filePath, options))
  await writeFile(filePath, content, options)
})

export { addCliBanner }

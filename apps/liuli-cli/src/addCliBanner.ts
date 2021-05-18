import { readFile, writeFile } from 'fs-extra'

export async function addCliBanner() {
  const filePath = './dist/bin.js'
  const options = {
    encoding: 'utf-8',
  }
  const content = '#!/usr/bin/env node\n' + (await readFile(filePath, options))
  await writeFile(filePath, content, options)
}

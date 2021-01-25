import { readFile, writeFile } from 'fs-extra'
import * as path from 'path'

async function addBanner(filePath: string, banner: string) {
  const options = {
    encoding: 'utf-8',
  }
  await writeFile(
    filePath,
    banner + (await readFile(filePath, options)),
    options,
  )
}

/**
 * 添加顶部的 cli 横幅
 */
export async function addCliBanner() {
  await addBanner(
    path.resolve(__dirname, 'dist/bin.js'),
    '#!/usr/bin/env node\n',
  )
}

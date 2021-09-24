/*
将 tsconfig 中的编译目标修改为 ESNext
*/

import * as path from 'path'
import { pathExists, readJson, writeJson } from 'fs-extra'

async function main() {
  const tsconfigPath = path.resolve('tsconfig.json')
  if (!(await pathExists(tsconfigPath))) {
    return
  }
  const tsconfigJson = await readJson(tsconfigPath)
  tsconfigJson.compilerOptions.target = 'ESNext'
  await writeJson(tsconfigPath, tsconfigJson, { spaces: 2 })
}

main()

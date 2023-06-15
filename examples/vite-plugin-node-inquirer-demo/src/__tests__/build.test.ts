import { it } from 'vitest'
import { build } from 'esbuild'
import { writeFile } from 'fs/promises'
import path from 'path'
import { initTempPath } from '@liuli-util/test'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

const tempPath = initTempPath(__filename)

it('chalk', async () => {
  const mod = require.resolve('chalk')
  const r = await build({
    entryPoints: [mod],
    platform: 'node',
    format: 'esm',
    write: false,
    sourcemap: 'inline',
    plugins: [nodeExternalsPlugin()],
  })
  await writeFile(path.resolve(tempPath, 'chalk.js'), r.outputFiles[0].text)
})

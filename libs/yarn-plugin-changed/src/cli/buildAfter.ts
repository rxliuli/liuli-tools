import path from 'path'
import { move, readFile, writeFile } from 'fs-extra'

async function buildAfter() {
  const pluginPath = path.resolve('./bundles/@yarnpkg/plugin-changed.js')
  await writeFile(
    pluginPath,
    (
      await readFile(pluginPath, 'utf-8')
    ).replace('@yarnpkg/plugin-changed', '@liuli-util/plugin-changed'),
  )
  await move(
    path.resolve('./bundles/@yarnpkg'),
    path.resolve('./bundles/@liuli-util'),
    {
      overwrite: true,
    },
  )
}

buildAfter()

import path from 'path'
import { move } from 'fs-extra'

async function buildAfter() {
  await move(
    path.resolve('./bundles/@yarnpkg'),
    path.resolve('./bundles/@liuli-util'),
    {
      overwrite: true,
    },
  )
}

buildAfter()

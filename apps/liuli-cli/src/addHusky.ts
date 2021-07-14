import * as path from 'path'
import { readJson, writeJson } from 'fs-extra'
import { execSync } from 'child_process'
import { merge } from 'lodash'

function installDeps(deps: string[]) {
  execSync('yarn add -D -W ' + deps.join(' '), {
    stdio: 'inherit',
  })
}

async function mergeJson(json: object) {
  const pkgJsonFilePath = path.resolve('./package.json')
  await writeJson(
    pkgJsonFilePath,
    merge(await readJson(pkgJsonFilePath), json),
    {
      spaces: 2,
    },
  )
}

export async function addHusky() {
  installDeps([
    'simple-git-hooks',
    'lint-staged',
    '@liuli-util/prettier-standard-config',
  ])
  //安装 prettier
  installDeps(['prettier'])
  await mergeJson({
    scripts: {
      postinstall: 'npx simple-git-hooks',
    },
    'simple-git-hooks': {
      'pre-commit': 'yarn lint-staged',
    },
    'lint-staged': {
      '*.{ts,tsx,js,jsx,css,md,json}': ['prettier --write', 'git add'],
    },
    prettier: '@liuli-util/prettier-standard-config',
  })
  //安装 commitlint
  installDeps(['@commitlint/cli', '@commitlint/config-conventional'])
  await mergeJson({
    'simple-git-hooks': {
      'commit-msg': 'yarn commitlint --edit $1',
    },
    commitlint: {
      extends: ['@commitlint/config-conventional'],
    },
  })
}

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
  installDeps(['husky@4.3.8', 'lint-staged'])
  //安装 prettier
  installDeps(['prettier'])
  await mergeJson({
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
      },
    },
    'lint-staged': {
      '*.{ts,tsx,js,jsx,css,md,json}': ['prettier --write', 'git add'],
    },
    prettier: {
      tabWidth: 2,
      printWidth: 80,
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
      endOfLine: 'lf',
    },
  })
  //安装 commitlint
  installDeps(['@commitlint/cli', '@commitlint/config-conventional'])
  await mergeJson({
    husky: {
      hooks: {
        'commit-msg': 'yarn commitlint --edit $1',
      },
    },
    commitlint: {
      extends: ['@commitlint/config-conventional'],
    },
  })
}

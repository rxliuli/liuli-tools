import * as path from 'path'
import { readJson, writeJson } from 'fs-extra'
import { execSync } from 'child_process'
import { merge } from 'lodash'

function installDeps(deps: string[]) {
  execSync('yarn add -D -W ' + deps.join(' '), {
    stdio: 'inherit',
  })
}

export async function addHusky() {
  installDeps(['husky@4.3.8', 'lint-staged'])
  const pkgJsonFilePath = path.resolve('./package.json')
  let json = await readJson(pkgJsonFilePath)
  //安装 prettier
  installDeps(['prettier'])
  json = merge(json, {
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
  json = merge(json, {
    husky: {
      hooks: {
        'commit-msg': 'yarn commitlint --edit $1',
      },
    },
    commitlint: {
      extends: ['@commitlint/config-conventional'],
    },
  })
  await writeJson(pkgJsonFilePath, json, {
    spaces: 2,
  })
}

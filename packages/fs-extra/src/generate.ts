import fsExtra from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { difference } from 'lodash-es'
import { format } from 'prettier'
import config from '@liuli-util/prettier-standard-config'

function scan() {
  const excludes = [
    'FileReadStream',
    'FileWriteStream',
    '_toUnixTimestamp',
    'F_OK',
    'R_OK',
    'W_OK',
    'X_OK',
    'gracefulify',
  ]
  return difference(Object.keys(fsExtra), excludes)
}

function generate(list: string[]) {
  return (
    `import fsExtra from 'fs-extra'\n\n` +
    list.map((it) => `export const ${it}: typeof fsExtra.${it} = fsExtra.${it}`).join('\n')
  )
}

async function build() {
  const list = scan()
  const code = format(generate(list), { ...config, parser: 'typescript' })
  await fsExtra.writeFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'index.ts'), code)
}

build()

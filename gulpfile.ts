import { copyFile, readdir, readJson, writeFile, writeJson } from 'fs-extra'
import * as path from 'path'

export function generateReadme({
  name,
  description,
}: {
  name: string
  description: string
}) {
  return `# ${name}

> ${description}

查看文档网站 [${name}](https://liuli-utils.rxliuli.com/${name})

## 安装

使用 yarn:

\`\`\`sh
yarn add ${name}
\`\`\`

或者使用 npm:

\`\`\`sh
npm install ${name}
\`\`\`
`
}

async function writeReadme(name: string, text: string) {
  const src = path.resolve(
    __dirname,
    'libs',
    name.slice(name.lastIndexOf('/') + 1),
    'README.md',
  )
  await writeFile(src, text)
}

const excludeLib = ['cli']

async function scanAllSubPackage() {
  const dirNameList = (await readdir('./libs')).filter(
    (name) => !excludeLib.includes(name),
  )
  return await Promise.all(
    dirNameList.map(async (name) => {
      const file = path.resolve(__dirname, 'libs', name, 'package.json')
      return [file, await readJson(file)] as const
    }),
  )
}

/**
 * 生成所有子模块的 README 文件
 */
export async function generateReadmes() {
  const pkgJsonList = await scanAllSubPackage()
  pkgJsonList.forEach(([, item]) => {
    const text = generateReadme(item)
    writeReadme(item.name, text)
  })
}

/**
 * 给所有子模块写入 license 字段
 */
export async function writeLicense() {
  const pkgJsonList = await scanAllSubPackage()
  const rootPkg = await readJson('./package.json')
  await Promise.all(
    pkgJsonList.map(async ([file, item]) => {
      item.license = rootPkg.license
      await writeJson(file, item, {
        encoding: 'utf-8',
        spaces: 2,
      })
    }),
  )
}

/**
 * 复制一些在线文档需要的内容
 */
export async function copyDocsFile() {
  await copyFile('./CNAME', './docs/CNAME')
}

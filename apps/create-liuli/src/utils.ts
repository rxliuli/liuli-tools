import { access, readFile, writeFile } from 'node:fs/promises'

export const pathExists = (s: string) =>
  access(s)
    .then(() => true)
    .catch(() => false)

export function extract(name: string): { org?: string; name: string } {
  if (!name.startsWith('@')) {
    return { name }
  }
  const r = name.split('/')
  return {
    org: r[0].slice(1),
    name: r[1],
  }
}

export async function changeFile(filePath: string, action: (text: string) => string) {
  const text = await readFile(filePath, 'utf-8')
  await writeFile(filePath, action(text))
}

export async function changeJson(jsonPath: string, action: (json: any) => any) {
  return await changeFile(jsonPath, (text) => {
    const json = JSON.parse(text)
    return JSON.stringify(action(json) ?? json, null, 2)
  })
}

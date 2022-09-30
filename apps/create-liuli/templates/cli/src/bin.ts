import { readFile } from 'fs/promises'

console.log(await readFile(new URL(import.meta.url), 'utf-8'))

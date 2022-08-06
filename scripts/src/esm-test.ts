import { readFile } from 'fs-extra'

console.log(await readFile(__filename, 'utf-8'))

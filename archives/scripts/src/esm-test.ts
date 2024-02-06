import { readFile } from '@liuli-util/fs-extra'

console.log(await readFile(__filename, 'utf-8'))

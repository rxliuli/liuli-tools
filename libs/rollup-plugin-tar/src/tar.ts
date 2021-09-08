import { Plugin } from 'rollup'
import { ArchiveOptions, createArchive } from './util/createArchive'

export function tar(options: ArchiveOptions): Plugin {
  return {
    name: '@liuli-util/rollup-plugin-tar',
    async writeBundle() {
      await createArchive(options)
    },
  }
}

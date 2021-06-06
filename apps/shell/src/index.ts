import path from 'path'
import { copy, mkdirp, move, pathExists, remove, rename } from 'fs-extra'

export class ShellProgram {
  static async remove(files: string[]) {
    await Promise.all(files.map((file) => remove(path.resolve(file))))
  }
  static async copy(files: string[]) {
    const sources = files.slice(0, files.length - 1)
    const dest = files[files.length - 1]
    await Promise.all(
      sources.map((source) => copy(path.resolve(source), path.resolve(dest))),
    )
  }

  static async move(files: string[]) {
    const sources = files.slice(0, files.length - 1)
    const dest = files[files.length - 1]
    if (sources.length === 1 && !(await pathExists(path.resolve(dest)))) {
      await rename(path.resolve(sources[0]), path.resolve(dest))
      return
    }
    await Promise.all(
      sources.map((source) => move(path.resolve(source), path.resolve(dest))),
    )
  }

  static async mkdir(dirs: string[]) {
    await Promise.all(dirs.map((source) => mkdirp(path.resolve(source))))
  }
}

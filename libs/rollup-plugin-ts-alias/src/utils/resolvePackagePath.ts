import { createRequire } from 'module'
import path from 'path'

export function resolvePackagePath(name: string) {
  return createRequire(path.resolve()).resolve(name).replace(/\\/g, '/')
}

export function resolvePackagePath(name: string) {
  return require.resolve(name).replace(/\\/g, '/')
}

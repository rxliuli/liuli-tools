import { AsyncArray } from '@liuli-util/async'
import { readJson } from 'fs-extra'
import path from 'path'
import { Digraph, findCycle } from './utils/Graph'
import { scanMods } from './utils/scanMods'

function findCycleDeps(deps: [string, string][]): string[] {
  const g = new Digraph<string>()
  deps.forEach(([a, b]) => {
    g.addNode(a)
    g.addNode(b)
    g.addEdge(a, b)
  })
  return findCycle(g)
}

interface PackageJson {
  name: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export async function scanCycleDeps(rootPath: string) {
  const list = await scanMods(rootPath)
  const jsons: PackageJson[] = await AsyncArray.flatMap(list, (s) =>
    readJson(path.resolve(rootPath, s, 'package.json')),
  )
  const names = new Set(jsons.map((j) => j.name))
  const deps: [string, string][] = await AsyncArray.flatMap(list, async (s) => {
    const json = await readJson(path.resolve(rootPath, s, 'package.json'))
    return Object.keys(json.dependencies ?? {})
      .concat(Object.keys(json.devDependencies ?? {}))
      .filter((s) => names.has(s))
      .map((d) => [json.name, d])
  })
  return findCycleDeps(deps)
}

import { AsyncArray } from '@liuli-util/async'
import { promise } from 'glob-promise'
import { groupBy } from 'lodash'

export async function globby(patterns: string[], options: { cwd: string }) {
  const g = groupBy(patterns, (i) => i.startsWith('!'))
  const ignore = (g['true'] ?? []).map((i) => i.slice(1))
  return await AsyncArray.flatMap(g['false'] ?? [], (p) => promise(p, { ignore, ...options }))
}

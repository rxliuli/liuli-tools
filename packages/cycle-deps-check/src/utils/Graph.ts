export interface IGraph<T> {
  addNode(p: T): void
  addEdge(a: T, b: T): void
  getEdges(p: T): T[]
  getNodes(): T[]
}

export class Digraph<T> implements IGraph<T> {
  private nodes: T[] = []
  private edges: [from: T, to: T][] = []

  private hasNode(p: T): boolean {
    return this.nodes.includes(p)
  }

  addNode(p: T): void {
    if (!this.hasNode(p)) {
      this.nodes.push(p)
    }
  }

  private hasEdge(a: T, b: T): boolean {
    return this.edges.some((e) => e[0] === a && e[1] === b)
  }

  addEdge(a: T, b: T): void {
    if (!this.hasEdge(a, b)) {
      this.edges.push([a, b])
    }
  }

  getEdges(p: T): T[] {
    return this.edges.filter((e) => e[0] === p).map((e) => e[1])
  }

  getNodes(): T[] {
    return this.nodes
  }
}

export function findCycle<T>(g: IGraph<T>): T[] {
  function findCycleByNode(n: T, path: T[]): T[] {
    if (path.includes(n)) {
      return [...path, n]
    }

    const nodes = g.getEdges(n)

    if (nodes.length === 0) {
      return []
    }

    const newPath = [...path, n]

    for (const next of nodes) {
      const r = findCycleByNode(next, newPath)

      if (r.length !== 0) {
        return r
      }
    }

    return []
  }

  const points = g.getNodes()

  for (const p of points) {
    const res = findCycleByNode(p, [])

    if (res.length !== 0) {
      return res
    }
  }

  return []
}

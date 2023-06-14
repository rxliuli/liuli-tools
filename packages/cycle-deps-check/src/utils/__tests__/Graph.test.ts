import { expect, it, describe } from 'vitest'
import { Digraph, findCycle } from '../Graph'

describe('Digraph', () => {
  it('basic', () => {
    const g = new Digraph<number>()
    g.addNode(1)
    g.addNode(2)
    g.addNode(3)
    g.addEdge(1, 2)
    g.addEdge(1, 3)
    g.addEdge(2, 3)
    expect(g.getEdges(1)).toEqual([2, 3])
    expect(g.getEdges(2)).toEqual([3])
    expect(g.getEdges(3)).toEqual([])
  })

  describe('findCycle', () => {
    it('no cycle', () => {
      const g = new Digraph<number>()
      g.addNode(1)
      g.addNode(2)
      g.addNode(3)
      g.addEdge(1, 2)
      g.addEdge(1, 3)
      g.addEdge(2, 3)
      expect(findCycle(g)).toEqual([])
    })

    it('has cycle', () => {
      const g = new Digraph<number>()
      g.addNode(1)
      g.addNode(2)
      g.addNode(3)
      g.addNode(4)
      g.addEdge(1, 2)
      g.addEdge(2, 3)
      g.addEdge(3, 4)
      g.addEdge(4, 1)
      expect(findCycle(g)).toEqual([1, 2, 3, 4, 1])
    })

    it('self cycle', () => {
      const g = new Digraph<number>()
      g.addNode(1)
      g.addEdge(1, 1)
      expect(findCycle(g)).toEqual([1, 1])
    })
  })
})

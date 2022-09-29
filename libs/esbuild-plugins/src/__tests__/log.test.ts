import { expect, it, vi } from 'vitest'
import { build } from 'esbuild'
import { log } from '../log'

it('log', async () => {
  const mockLog = vi.fn()
  vi.spyOn(global.console, 'log').mockImplementation(mockLog)

  await build({
    stdin: {
      contents: `export const name = 'liuli'`,
    },

    plugins: [log()],
    write: false,
  })

  expect(mockLog.mock.calls.length).toBe(1)
})

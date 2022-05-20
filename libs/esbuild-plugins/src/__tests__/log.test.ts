import { build } from 'esbuild'
import { log } from '../log'

it('log', async () => {
  const mockLog = jest.fn()
  jest.spyOn(global.console, 'log').mockImplementation(mockLog)
  await build({
    stdin: {
      contents: `export const name = 'liuli'`,
    },
    plugins: [log()],
    write: false,
  })
  expect(mockLog.mock.calls.length).toBe(1)
})

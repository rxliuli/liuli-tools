import { generate } from '../generate'

it('测试 generate', () => {
  const envs = ['PORT', 'ENV', 'BASE_URL']
  const res = [...generate(envs).values()].join('\n')
  expect(res.includes('PORT: string')).toBeTruthy()
})

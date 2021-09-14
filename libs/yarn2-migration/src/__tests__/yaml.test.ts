import { parse } from 'yaml'
import * as console from 'console'

it('测试 yaml', () => {
  const res = parse(`
  yarnPath: ".yarn/releases/yarn-berry.cjs"
`)
  console.log(res)
})

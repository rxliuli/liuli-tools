import { StateMachine } from './StateMachine'
test('test StateMachine', () => {
  const stateMachine = StateMachine.getFactory()
  class Base {
    hello () {
      return 'base'
    }
  }
  const A = stateMachine.register(
    1,
    class A extends Base {
      hello () {
        return 'a'
      }
    }
  )
  const B = stateMachine.register(2, class B extends Base {})

  expect(stateMachine.getInstance(1).hello()).toBe('a')
  expect(stateMachine.getInstance(2).hello()).toBe('base')
  expect(stateMachine.getInstance(3)).toBeNull()
})

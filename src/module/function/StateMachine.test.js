import { StateMachine } from './StateMachine'

/**
 * @test {StateMachine}
 */
describe('test StateMachine', () => {
  it('simple example', () => {
    const stateMachine = StateMachine.getFactory()
    class Base {
      hello () {
        return 'base'
      }
    }
    stateMachine.register(
      1,
      class A extends Base {
        hello () {
          return 'a'
        }
      }
    )
    stateMachine.register(2, class B extends Base {})

    expect(stateMachine.getInstance(1).hello()).toBe('a')
    expect(stateMachine.getInstance(2).hello()).toBe('base')
    expect(stateMachine.getInstance(3)).toBeNull()
  })
})

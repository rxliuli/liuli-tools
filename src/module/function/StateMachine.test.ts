import { StateMachine } from './StateMachine'

/**
 * @test {StateMachine}
 */
describe('test StateMachine', () => {
  it('simple example', () => {
    const stateMachine = StateMachine.getFactory()
    class Base {
      public hello() {
        return 'base'
      }
    }
    stateMachine.register(
      1,
      class A extends Base {
        public hello() {
          return 'a'
        }
      },
    )
    stateMachine.register(2, class B extends Base {})

    expect(stateMachine.getInstance(1).hello()).toBe('a')
    expect(stateMachine.getInstance(2).hello()).toBe('base')
    expect(stateMachine.getInstance(3)).toBeNull()
  })
  it('use for-of foreach StateMachine', () => {
    class Base {}
    class A extends Base {}
    // tslint:disable-next-line:max-classes-per-file
    class B extends Base {}
    // tslint:disable-next-line:max-classes-per-file
    class C extends Base {}

    const stateMachine = StateMachine.getFactory()
    stateMachine.register('A', A)
    stateMachine.register('B', B)
    stateMachine.register('C', C)

    // @ts-ignore
    for (const [state, clazz] of stateMachine) {
      expect(['A', 'B', 'C'].includes(state)).toBeTrue()
      expect([A, B, C].includes(clazz)).toBeTrue()
    }
  })
})

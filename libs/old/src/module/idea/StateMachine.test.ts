import { Func } from 'liuli-types'

describe('测试状态机模式', () => {
  it('测试使用函数式基本示例', () => {
    let toggle: Func
    const FSM = {
      on: jest.fn(() => {
        console.log('开灯')
        toggle = FSM.off
      }),
      off: jest.fn(() => {
        console.log('关灯')
        toggle = FSM.on
      }),
    }
    toggle = FSM.on

    toggle()
    expect(FSM.on.mock.calls.length).toBe(1)
    toggle()
    expect(FSM.off.mock.calls.length).toBe(1)
    toggle()
    expect(FSM.on.mock.calls.length).toBe(2)
    toggle()
    expect(FSM.off.mock.calls.length).toBe(2)
  })

  it('测试使用 interface 的基本示例', () => {
    let testRes: string[] = []

    class Light {
      //无法在一个地方看到状态是如何流转的了
      offLightState = new OffLightState(this)
      weakLightState = new WeakLightState(this)
      strongLightState = new StrongLightState(this)
      state: BaseLightState
      constructor() {
        this.state = this.offLightState
      }

      click() {
        this.state.click()
      }
    }
    //基本状态
    interface BaseLightState {
      click(): void
    }

    class OffLightState implements BaseLightState {
      constructor(private light: Light) {}
      click(): void {
        console.log('开灯')
        testRes.push('开灯')
        this.light.state = this.light.weakLightState
      }
    }
    class WeakLightState implements BaseLightState {
      constructor(private light: Light) {}
      click(): void {
        console.log('强光')
        testRes.push('强光')
        this.light.state = this.light.strongLightState
      }
    }
    class StrongLightState implements BaseLightState {
      constructor(private light: Light) {}
      click(): void {
        console.log('关灯')
        testRes.push('关灯')
        this.light.state = this.light.offLightState
      }
    }

    const light = new Light()
    light.click()
    light.click()
    light.click()
    expect(testRes).toEqual(['开灯', '强光', '关灯'])
  })
})

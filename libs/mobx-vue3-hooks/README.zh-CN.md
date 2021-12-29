# @liuli-util/mobx-vue3-hooks

## 简介

一个灵感：如果我们在 react 中能像 vue3 一样使用钩子又不需要手动管理依赖的话，生活是否会更美好？于是我花了一点时间基于 mobx 实现了几个 vue3 中常用的 hooks 函数。

## 快速入门

```tsx
const UseRefDemo = defineComponent(() => {
  const state = useVRef(0)
  const computedValue = useVComputed(() => state.value * 2)

  const onInc = useVFn(() => {
    state.value++
  })
  return (
    <div>
      <button onClick={onInc}>增加</button>
      <div>{computedValue.value}</div>
    </div>
  )
})
```

## API

- `defineComponent`: 定义一个组件
- `useVReactive`: 创建一个对象类型的可变状态
- `useVRef`: 创建一个原始类型的可变状态
- `useVComputed`: 创建一个计算值
- `useVFn`: 创建一个普通函数（vue3 中实际上只需要在 setup 函数中声明普通函数就好了）
- `useVWatchEffect`: 创建一个 watch 监听状态的变化并作出响应
- `useVWatch`: 与 useVWatchEffect 类型但允许传入依赖项，与 vue3 不同的是必须使用函数而非值

> 灵感来源：<https://github.com/RisingStack/react-easy-state#local-stores-in-function-components>，相关讨论: <https://github.com/mobxjs/mobx/discussions/3209>

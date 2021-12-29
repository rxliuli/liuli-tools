# @liuli-util/mobx-vue3-hooks

## Introduction

An inspiration: If we can use hooks like vue3 in react without manually managing dependencies, will life be better? So I spent a little time implementing several hooks functions commonly used in vue3 based on mobx.

## Quick start

```tsx
import { defineComponent, useVRef, useVFn, useVComputed } from '@liuli-util/mobx-vue3-hooks'

const HelloWorld = defineComponent(() => {
  const state = useVRef(0)
  const computedValue = useVComputed(() => state.value * 2)

  const onInc = useVFn(() => {
    state.value++
  })
  return (
    <div>
      <button onClick={onInc}>Add</button>
      <div>{computedValue.value}</div>
    </div>
  )
})
```

## API

- `defineComponent`: Define a component
- `useVReactive`: Create a mutable state of an object type
- `useVRef`: create a primitive type of mutable state
- `useVComputed`: Create a calculated value
- `useVFn`: Create an ordinary function (in vue3, you only need to declare the ordinary function in the setup function)
- `useVWatchEffect`: Create a watch to monitor state changes and respond to them
- `useVWatch`: Same type as useVWatchEffect but allows to pass in dependencies. The difference from vue3 is that you must use a function instead of a value

> Source of inspiration: <https://github.com/RisingStack/react-easy-state#local-stores-in-function-components>, related discussion: <https://github.com/mobxjs/mobx/discussions/3209>

import { observer } from 'mobx-react'
import { action, autorun, computed, observable, reaction } from 'mobx'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useVReactive<T extends object>(value: T): T {
  const [state] = useState(() => observable(value))
  return state
}

export function useVRef<T>(value: T): { value: T } {
  return useVReactive({ value })
}

export function useVComputed<T>(fn: () => T): { value: T } {
  const computedValue = useMemo(() => computed(fn), [])
  return {
    get value() {
      return computedValue.get()
    },
  }
}

export function useVFn<T extends (...args: any[]) => any>(fn: T): T {
  return useCallback(action(fn), [])
}

export function useVWatch(deps: () => any, fn: () => void): void {
  useEffect(() => reaction(deps, fn), [])
}

export function useVWatchEffect(fn: () => void): void {
  useEffect(() => autorun(fn), [])
}

const contextMap = observable(new Map<ContextKey<any>, any>())
// eslint-disable-next-line
export interface ContextKey<T> extends Symbol {}
export function useVProvide<T>(key: ContextKey<T>, value: T): void {
  useState(action(() => contextMap.set(key, value)))
  useEffect(
    action(() => {
      contextMap.set(key, value)
      return action(() => {
        contextMap.delete(key)
      })
    }),
    [],
  )
}
export function useVInject<T>(key: ContextKey<T>): T | undefined {
  const value = useMemo(() => computed(() => contextMap.get(key)), [])
  const state = useVRef(value.get())
  useVWatchEffect(() => (state.value = value.get()))
  return state.value
}

export const defineComponent = observer

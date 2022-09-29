import { useReducer, useState } from 'preact/hooks'
import css from './app.module.css'

export function App() {
  const [hide, toggle] = useReducer((s) => !s, false)
  return (
    <div>
      <button onClick={toggle}>toggle</button>
      <p className={hide ? css.hide : ''}>test</p>
    </div>
  )
}

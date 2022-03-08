import * as React from 'react'
import { history } from '../constants/router'

type HomeProps = {}

export const HomeView: React.FC<HomeProps> = () => {
  function onClick() {
    history.push({
      pathname: '/hello-world',
      query: {
        name: 'liuli',
        age: 17,
        firends: ['miku', 'sora'],
      },
    })
  }
  return (
    <div>
      <h2>HomeView</h2>
      <button onClick={onClick}>Hello World</button>
    </div>
  )
}

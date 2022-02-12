import * as React from 'react'
import { history } from '../constants/router'

type HelloWorldProps = {}

export const HelloWorld: React.FC<HelloWorldProps> = () => {
  return (
    <div>
      <h2>HelloWorld</h2>
      <button onClick={history.back}>back</button>
    </div>
  )
}

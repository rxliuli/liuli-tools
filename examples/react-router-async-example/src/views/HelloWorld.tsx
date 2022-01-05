import * as React from 'react'
import { history } from '../constants/router'

type HelloWorldProps = {}

console.log('HelloWorld')
export const HelloWorld: React.FC<HelloWorldProps> = () => {
  return (
    <div>
      <h2>HelloWorld</h2>
      <button onClick={history.back}>back</button>
    </div>
  )
}

export default HelloWorld

import { useSearchParams } from '@liuli-util/react-router'
import * as React from 'react'
import { useEffect } from 'react'
import { history } from '../constants/router'

type HelloWorldProps = {}

export const HelloWorld: React.FC<HelloWorldProps> = () => {
  const [params] = useSearchParams()
  useEffect(() => {
    const params = new URLSearchParams(history.location.search)
    console.log('search: ', [...params.entries()])
  }, [])

  return (
    <div>
      <h2>HelloWorld</h2>
      <pre>
        {JSON.stringify(
          {
            name: params.get('name'),
            age: params.get('age'),
            firends: params.getAll('firends'),
          },
          null,
          2,
        )}
      </pre>
      <button onClick={history.back}>back</button>
    </div>
  )
}

import * as React from 'react'
import { Link } from '@liuli-util/react-router'

type HomeProps = {}

export const HomeView: React.FC<HomeProps> = () => {
  return (
    <div>
      <h2>HomeView</h2>
      <Link to={'/hello-world'}>Hello World</Link>
    </div>
  )
}

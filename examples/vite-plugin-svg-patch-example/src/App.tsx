import { Logo } from '@liuli-util/vite-plugin-svg-patch-share-example'
import profile from './assets/profile.jpg'

function App() {
  return (
    <div>
      <Logo />
      <img src={profile} />
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-screen h-screen min-w-[320px] bg-stone-800 text-white flex items-center justify-center font-sans">
      <div className="max-w-md p-8 text-center">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className={'h-[6rem] inline-block p-6'} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className={'h-[6rem] inline-block p-6 animate-spin-slow'} alt="React logo" />
          </a>
        </div>
        <h1 className={'text-5xl'}>Vite + React</h1>
        <div className={'p-6'}>
          <button
            className={
              'rounded-lg border border-transparent px-3 py-2 text-base font-medium bg-stone-950 cursor-pointer transition-colors duration-200'
            }
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-gray-500">Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  )
}

export default App

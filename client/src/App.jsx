import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SplashScreen from './pages/SplashScreen'

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
  <SplashScreen/>
</>

  )
}

export default App

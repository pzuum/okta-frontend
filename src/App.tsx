
import { Profiler, ProfilerOnRenderCallback } from 'react'
import './App.css'
import AppRouter from './router'
import { StateProvider } from './state'

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime)
}

function App() {

  return <Profiler id="StateProvider" onRender={onRender}>

  
  <StateProvider>

      <AppRouter />
  </StateProvider>
  </Profiler>
}

export default App

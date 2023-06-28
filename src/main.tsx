import { Profiler, ProfilerOnRenderCallback } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const  onRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  // Aggregate or log render timings...
  console.log(id, phase, actualDuration, baseDuration, startTime, commitTime)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Profiler id="App" onRender={onRender}>
        <App />
    </Profiler>
)

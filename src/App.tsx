
import './App.css'
import AppRouter from './router'
import { StateProvider } from './state'

function App() {

  return <StateProvider>

      <AppRouter />
  </StateProvider>
}

export default App

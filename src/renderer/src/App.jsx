import { Route, Routes } from 'react-router-dom'
import { Home, Info, Setting } from './screen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/Help" element={<Info />} />
    </Routes>
  )
}

export default App

import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Home, Info, Setting } from './screen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/Help" element={<Info />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

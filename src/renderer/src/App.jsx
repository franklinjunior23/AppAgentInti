import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Home, Info, Setting } from './screen'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/Help" element={<Info />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App

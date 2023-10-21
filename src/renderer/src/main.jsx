import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Info, Setting } from './screen'
import Login from './screen/Login'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Login />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/Help" element={<Info />} />
    </Routes>
  </Router>
)

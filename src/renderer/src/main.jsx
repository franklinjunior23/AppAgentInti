import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Setting } from './screen'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Setting" element={<Setting />} />
    </Routes>
  </Router>
)

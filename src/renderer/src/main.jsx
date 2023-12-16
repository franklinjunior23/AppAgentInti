import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Info, Setting } from './screen'
import Login from './screen/Login'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/SignIn" element={<Login />} />
        <Route path="/" INDE element={<Home />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/Help" element={<Info />} />
      </Routes>
    </Router>
    <ToastContainer position="bottom-right" theme="dark" />
  </QueryClientProvider>
)

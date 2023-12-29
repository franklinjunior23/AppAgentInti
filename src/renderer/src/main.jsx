import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Info, Setting, Update } from './screen'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Support from './screen/Support'
// import Login from './screen/Login'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        {/* <Route path="/SignIn" element={<Login />} /> */}
        <Route path="/" INDE element={<Home />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/Help" element={<Info />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Support" element={<Support />} />
      </Routes>
    </Router>
    <ToastContainer position="bottom-right" theme="dark" />
  </QueryClientProvider>
)

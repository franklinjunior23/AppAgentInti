import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Info, Setting, Update } from './screen'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Support from './screen/Support'
import Layaout from './screen/Layaout'
import Example from './screen/Example'
import { ProvideSystemData } from './store/Use-data-system'

// import Login from './screen/Login'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProvideSystemData>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<Layaout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Help" element={<Info />} />
            <Route path="/Update" element={<Update />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/Report" element={<Example />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer position="bottom-right" theme="dark" />
    </QueryClientProvider>
  </ProvideSystemData>
)

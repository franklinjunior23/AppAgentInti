import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Setting } from './screen'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Support from './screen/Support'
import Layaout from './screen/Layaout'
import { ProvideSystemData } from './store/Use-data-system'
import '@fontsource-variable/inter'
import PageAplications from './screen/Aplications'
import History from './screen/History'
import { ThemeProvider } from './provider/Theme'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProvideSystemData>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<Layaout />}>
              <Route path="/" index element={<Home />} />
              <Route path="/aplications" element={<PageAplications />} />
              <Route path="/Setting" element={<Setting />} />
              <Route path="/history" element={<History />} />
              <Route path="/Support" element={<Support />} />
              <Route path="/help" element={<>Reportes</>} />
            </Route>
          </Routes>
        </Router>

        <ToastContainer position="bottom-right" theme="dark" />
      </QueryClientProvider>
    </ThemeProvider>
  </ProvideSystemData>
)

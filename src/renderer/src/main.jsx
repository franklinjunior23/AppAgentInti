import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Setting } from './screen'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Support from './screen/Support'

import { ProvideSystemData } from './store/Use-data-system'
import '@fontsource-variable/inter'
import PageAplications from './screen/Aplications'
import History from './screen/History'
import { ThemeProvider } from './provider/Theme'
import Layaout from './layaout/default'
import ErrorProvider from './provider/ErrorsProvider'
import NotificationProver from './provider/notification-provider'
import Info from './screen/Info'
import SoftwarePage from './screen/software'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorProvider>
    <NotificationProver>
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
                  <Route path="/Software" element={<SoftwarePage />} />
                  <Route path="/help" element={<Info />} />
                </Route>
              </Routes>
            </Router>

            <ToastContainer position="bottom-right" theme="dark" />
          </QueryClientProvider>
        </ThemeProvider>
      </ProvideSystemData>
    </NotificationProver>
  </ErrorProvider>
)

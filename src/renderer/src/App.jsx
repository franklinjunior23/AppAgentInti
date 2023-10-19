import { Route, Routes } from 'react-router-dom'
import { Home, Info, Setting } from './screen'

function App() {
  // const [EstadoInfo, setEstadoInfo] = useState([])
  // useEffect(() => {
  //   async function getInfo() {
  //     const data = await window.SistemInfo.GetInfoSystem()
  //     setEstadoInfo(data)
  //   }
  //   getInfo()
  // }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/Help" element={<Info />} />
    </Routes>
  )
}

export default App

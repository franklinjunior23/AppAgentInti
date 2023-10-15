import Header from './components/Header'
import { useEffect, useState } from 'react'

function App() {
  const [EstadoInfo, setEstadoInfo] = useState([])
  useEffect(() => {
    async function getInfo() {
      const data = await window.SistemInfo.GetInfoSystem()
      setEstadoInfo(data)

    }
    getInfo()
  }, [])
  console.log(EstadoInfo)
  return (
    <div className="p-4">
      <Header />
      <main className="ml-[260px]"></main>
    </div>
  )
}

export default App

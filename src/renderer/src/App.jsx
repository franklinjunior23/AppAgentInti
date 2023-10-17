import Header from './components/Header'
import { useEffect, useState } from 'react'

function App() {
  const [EstadoInfo, setEstadoInfo] = useState([])

  useEffect(() => {
    async function RecivitdData() {
      const dataProvider = await window.SistemInfo.GetInfoSystem()
      setEstadoInfo(dataProvider)
      console.log(dataProvider)
    }
    RecivitdData()
  }, [setEstadoInfo])

  return (
    <div className="p-4">
      <Header />

      <main className="ml-[260px]">
        {EstadoInfo.length !== 0 ? JSON.stringify(EstadoInfo) : 'no hay nada'}
      </main>
    </div>
  )
}

export default App

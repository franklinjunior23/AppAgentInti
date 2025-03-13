import React, { useEffect, useState } from 'react'

function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await window.systemAPI.getHistory({ limit: 20, offset: 0 }) // ✅ Enviamos parámetros correctamente
        setHistory(data)
      } catch (error) {
        console.error('❌ Error obteniendo history:', error)
      }
    }

    fetchHistory()
  }, [])
  return (
    <div>
      <h4 className="text-2xl">Historial del dispositivo</h4>
      <main className="flex flex-col gap-3 mt-5">
        {history.map((item, index) => (
          <div key={index} className="border p-2">
            <header className='flex justify-between'>
              <span>{item?.title}</span>
              <span>{item.createdAt}</span>
            </header>
            <p className='text-sm mt-4'>{item.description}</p>
          </div>
        ))}
      </main>
    </div>
  )
}

export default History

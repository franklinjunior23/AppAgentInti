import { Input } from '@/components/ui/input'
import React from 'react'
import { useEffect, useState } from 'react'

const traducciones = {
  RegistryDirName: 'Nombre del Directorio del Registro',
  UninstallString: 'Comando de Desinstalación',
  DisplayName: 'Nombre del Software',
  AuthorizedCDFPrefix: 'Prefijo Autorizado',
  InstallSource: 'Ruta de Instalación',
  Size: 'Tamaño',
  DisplayVersion: 'Versión',
  HelpTelephone: 'Teléfono de Ayuda',
  Publisher: 'Empresa',
  Contact: 'Contacto',
  Comments: 'Comentarios',
  DisplayIcon: 'Icono de Instalación',
  EstimatedSize: 'Tamaño Estimado',
  InstallDate: 'Fecha de Instalación'
}

export default function SoftwarePage() {
  const [software, setSoftware] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const data = await window.systemAPI.getSoftwareList()
        setSoftware(data)
      } catch (error) {
        console.error('Error fetching software list:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSoftware()
  }, [])

  function handleSearchChange(event) {
    setSearchName(event.target.value)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const currentYear = new Date().getFullYear()

  const filteredSoftware = software
    .filter(
      (item) =>
        // item.InstallLocation !== null ||
        item.InstallLocation !== undefined 
        && item?.InstallLocation !== ''
    )
    .sort((a, b) => {
      const yearA = a.InstallDate?.slice(0, 4)
      const yearB = b.InstallDate?.slice(0, 4)

      const isCurrentYearA = yearA === String(currentYear)
      const isCurrentYearB = yearB === String(currentYear)

      // Si uno es de este año y otro no, lo de este año va primero
      if (isCurrentYearA && !isCurrentYearB) return -1
      if (!isCurrentYearA && isCurrentYearB) return 1

      // Si ambos son del mismo grupo (ambos del año o no), ordena por fecha
      return a.InstallDate?.localeCompare(b.InstallDate || '') || 0
    })
    .filter((item) => item.DisplayName?.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <main>
      <h1>Software List</h1>
      <header className="mt-2 w-[300px]">
        <Input
          placeholder="Buscar por nombre de software"
          onChange={handleSearchChange}
          value={searchName}
        />
      </header>
      <section>
        <div className="space-y-4">
          {filteredSoftware.map((item, index) => (
            <div key={index} className="p-4 rounded-lg shadow-sm">
              {/* {Object.entries(item).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <span className="font-semibold dark:text-white">{traducciones[key] || key}:</span>{' '}
                  <span className="dark:text-white break-words">{value || 'No disponible'}</span>
                </div>
              ))} */}
              <header className="flex justify-between items-center">
                <div className=" grid gap-2">
                  <span> {item?.DisplayName}</span>{' '}
                  <span className="text-sm">RegistryDirName : {item?.RegistryDirName}</span>
                  <section>
                    <ul>
                      <li>
                        <span>Version : {item?.DisplayVersion}</span>
                      </li>
                      <li>
                        <span>Ruta de instalación : {item?.InstallLocation}</span>
                      </li>
                    </ul>
                  </section>
                </div>
                <span className="text-lg">{item?.InstallDate}</span>
              </header>
            </div>
          ))}
        </div>

        <div className="mt-4 text-gray-500 text-sm">
          <p>Nota: La información puede variar según la configuración del sistema.</p>
          <p>
            Si no se muestra información, asegúrate de que el software esté instalado correctamente.
          </p>
          <p>Para más detalles, consulta la documentación del software.</p>
        </div>
      </section>
    </main>
  )
}

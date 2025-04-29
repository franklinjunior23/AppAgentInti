import React, { useEffect } from 'react'
import { useDataSystem } from '../../store/Use-data-system'
import UserAuth from '@/componentes/items/UserAuth'
import SystemOperative from '@/componentes/items/SystemOperative'
import MemoryRam from '@/componentes/items/MemoryRam'
import Monitory from '@/componentes/items/Monitory'
import Bios from '@/componentes/items/Bios'
import Storage from '@/componentes/items/Storage'
import Processor from '@/componentes/items/Processor'
import Network from '@/componentes/items/Network'
import Motherboard from '@/componentes/items/Motherboard'
import SectionLayaout from '@/componentes/items/SectionLayaout'
import { Separator } from '@/components/ui/separator'
import StateUsage from '@/componentes/items/state-use'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { toast } from 'react-toastify'

export default function Home() {
  const [dataConfiguration, setDataConfiguration] = React.useState(null)

  useEffect(() => {
    window.systemAPI.getConfig().then((data) => {
      if (data) {
        setDataConfiguration(data)
      }
    })
  }, [])

  function RefreshData() {
    const toastId = toast.loading('Verificando Cambios en el dispositivo...', {
      position: 'bottom-right',
      theme: 'dark',
      autoClose: false // no se cierra solo
    })

    window.systemAPI
      .refreshChanges()
      .then(() => {
        setTimeout(() => {
          toast.update(toastId, {
            render: 'Cambios actualizados correctamente ✅',
            type: 'success',
            isLoading: false,
            autoClose: 5000 // se cerrará en 5 segundos
          })
        }, 10000) // 10 segundos = 10000 ms
      })
      .catch(() => {
        toast.update(toastId, {
          render: 'Error al actualizar los cambios ❌',
          type: 'error',
          isLoading: false,
          autoClose: 5000
        })
      })
  }

  const { datainformation } = useDataSystem()
  if (!datainformation) return <h2>Cargando ...</h2>
  return (
    <>
      <main className=" text-white ">
        <section className="">
          <SectionLayaout
            className={
              'bg-gradient-to-r dark:from-indigo-500/50  from-indigo-500 from-10% dark:via-sky-500/40 via-sky-500  via-30% dark:to-emerald-500/50 to-emerald-500 to-90%0  '
            }
          >
            <section className="flex justify-between items-center">
              <SystemOperative />
              <Separator className="h-[200px]  bg-white/20 w-0.5 " />
              <UserAuth />
            </section>
          </SectionLayaout>
        </section>
        <section className="my-2 text-black dark:text-white p-4 border rounded-lg">
          <section>
            <ul>
              <li className="flex justify-between items-center">
                <span>Ultima conexion con el servidor :</span>
                <span>
                  {dataConfiguration?.updatedHeartbeat
                    ? new Date(dataConfiguration?.updatedHeartbeat).toLocaleString('es-PE', {
                        timeZone: 'America/Lima'
                      })
                    : 'No hay ultima conexion'}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>
                  Ultima Verificación de Cambios :{' '}
                  <Button variant="icon" onClick={RefreshData}>
                    <RefreshCcw className="size-3" />
                  </Button>{' '}
                </span>
                <span>
                  {dataConfiguration?.updatedChangesAt
                    ? new Date(dataConfiguration?.updatedChangesAt).toLocaleString('es-PE', {
                        timeZone: 'America/Lima'
                      })
                    : 'No hay ultima conexion'}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Id Dispositivo :</span>
                <span>{dataConfiguration?.id_device ?? 'No hay id de dispositivo'}</span>
              </li>
            </ul>
          </section>
        </section>

        <section className="">
          <div className="grid grid-cols-2 my-4 gap-5">
            <StateUsage />
            <div className="flex flex-col gap-5">
              <Motherboard />
              <Processor />
            </div>
          </div>
          <main className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Monitory />
              <Bios />
            </div>
            <div className="flex flex-col gap-4">
              <MemoryRam />
            </div>
          </main>
          <main className="flex flex-col gap-4 pb-4 mt-4">
            <Storage />
            <Network />
          </main>
        </section>
      </main>
    </>
  )
}

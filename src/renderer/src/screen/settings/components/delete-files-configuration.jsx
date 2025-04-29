import React from 'react'
import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import { Trash } from 'lucide-react'
import { toast } from 'react-toastify'

export default function DeleteFileConfiguration() {
  function handleDeleteFiles() {
    const toastId = toast.loading('Eliminando archivos de configuracion...', {
      position: 'bottom-right',
      theme: 'dark',
      autoClose: false // no se cierra solo
    })

    setTimeout(() => {
      toast.update(toastId, {
        render: 'Archivos de configuracion eliminados correctamente ✅',
        type: 'success',
        isLoading: false,
        autoClose: 5000 // se cerrará en 5 segundos
      })
      window.systemAPI.deleteSoftware()
    }, 10000) // 10 segundos = 10000 ms
  }
  return (
    <main className="mt-10">
      <CardDescription>
        Si sucede un error en la configuracion del dispositivo, puedes eliminar los archivos de
        configuracion. Esto eliminara los archivos de configuracion y el dispositivo se reiniciara.
        Asegurate de que el dispositivo este conectado a la red y de que los archivos de
        configuracion esten disponibles antes de proceder. Esta accion no se puede deshacer, por lo
        que es importante tener cuidado al realizarla. Si no estas seguro de lo que estas haciendo,
        es recomendable consultar con un experto o seguir las instrucciones del fabricante antes de
        continuar. Si tienes dudas, no dudes en ponerte en contacto con el soporte tecnico para
        obtener ayuda adicional.
        <br />
      </CardDescription>
      <Button variant="destructive" onClick={handleDeleteFiles} className="w-full flex gap-2 mt-2">
        <Trash className="size-5" /> Eliminar Archivos de configuracion
      </Button>
    </main>
  )
}

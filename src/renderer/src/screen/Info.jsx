import React, { useEffect, useState } from 'react'
import { useDataSystem } from '@/store/Use-data-system'
import { Button } from '@/components/ui/button'

function Info() {
  const [appVersion, setAppVersion] = useState('')

  const { UpdateAvailableInfo } = useDataSystem()

  useEffect(() => {
    window.systemAPI.getAppVersion().then(setAppVersion)
  }, [])
  return (
    <>
      <main className="">
        <h2>Version : {appVersion ?? 'No hay version'}</h2>

        {UpdateAvailableInfo?.version && (
          <h2>Hay una nueva versión disponible: {UpdateAvailableInfo.version}</h2>
        )}

        {
          UpdateAvailableInfo?.version && (
            <Button onClick={() => window.systemAPI.startDownload()}>
              Descargar actualizacion
            </Button>
          )
        }
        <h1 className="font-semibold text-2xl  mb-2">Agente IntisCorp</h1>
        <p className="text-pretty text-sm">
          Bienvenido al servicio de asistencia del Agente IntisCorp. Estamos aquí para ayudarte en
          todo lo que necesites. Si tienes alguna pregunta, inquietud o problema, no dudes en
          ponerte en contacto con nosotros. Nuestro equipo de soporte está disponible las 24 horas
          del día, los 7 días de la semana, para proporcionarte la mejor asistencia posible. Puedes
          comunicarte con nosotros a través de los siguientes canales:
        </p>
        <ul className="list-disc pl-5 my-4">
          <li>Teléfono: +51 946078316</li>
          <li>Correo electrónico: contacto@intiscorp.com.pe</li>
        </ul>
        <p className="text-pretty text-sm">
          Además, aquí encontrarás recursos útiles, tutoriales y preguntas frecuentes que te
          ayudarán a sacar el máximo provecho de nuestros servicios. ¡Gracias por elegir al Agente
          IntisCorp! Estamos comprometidos a brindarte una experiencia excepcional.
        </p>
        <p className="text-pretty"></p>
      </main>
    </>
  )
}

export default Info

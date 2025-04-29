import React, { useEffect, useState } from 'react'
import { useDataSystem } from '@/store/Use-data-system'
import { Button } from '@/components/ui/button'

function Info() {
  const [appVersion, setAppVersion] = useState('')
  const [Progress, setProgress] = useState(0)

  const { UpdateAvailableInfo } = useDataSystem()

  useEffect(() => {
    window.systemAPI.onUpdateProgress((data) => {
      setProgress(data)
    })
    return () => {
      window.systemAPI.removeListenerUpdateProgress()
    }
  }, [])

  useEffect(() => {
    window.systemAPI.getAppVersion().then(setAppVersion)
  }, [])
  return (
    <>
      <h1 className="font-semibold text-2xl">Agente IntisCorp</h1>
      <main className="grid grid-cols-2 gap-5 mt-4">
        <section>
          <p className="text-justify text-sm">
            Bienvenido al servicio de asistencia del Agente IntisCorp. Estamos aquí para ayudarte en
            todo lo que necesites. Si tienes alguna pregunta, inquietud o problema, no dudes en
            ponerte en contacto con nosotros. Nuestro equipo de soporte está disponible las 24 horas
            del día, los 7 días de la semana, para proporcionarte la mejor asistencia posible.
            Puedes comunicarte con nosotros a través de los siguientes canales:
          </p>
          <ul className="list-disc pl-5 my-4">
            <li>+51 946078316</li>
            <li>contacto@intiscorp.com.pe</li>
          </ul>
          <p className="text-pretty text-sm">
            Además, aquí encontrarás recursos útiles, tutoriales y preguntas frecuentes que te
            ayudarán a sacar el máximo provecho de nuestros servicios. ¡Gracias por elegir al Agente
            IntisCorp! Estamos comprometidos a brindarte una experiencia excepcional.
          </p>
          <p className="text-pretty"></p>
        </section>
        <section>
          <div className="p-3 px-5 border rounded-lg">
            <h2 className="flex justify-between items-center">
              Version <span>{appVersion ?? 'No hay version'}</span>
            </h2>
          </div>

          <section className="mt-2">
            {UpdateAvailableInfo?.version && (
              <h2>Hay una nueva versión disponible: {UpdateAvailableInfo.version}</h2>
            )}

            {Progress > 0 && (
              <h2>
                Progreso de descarga: {Progress.percent} % ({Progress.transferred} bytes de{' '}
                {Progress.total} bytes)
              </h2>
            )}
            {Progress === 100 && (
              <h2 className="text-green-500">La descarga ha finalizado. Listo para instalar.</h2>
            )}

            {Progress > 0 && Progress < 100 && (
              <h2 className="text-yellow-500">Descargando actualizacion...</h2>
            )}
            {Progress === 0 && !UpdateAvailableInfo?.version && (
              <h2 className="text-red-500">No hay actualizaciones disponibles.</h2>
            )}
            {Progress === 100 && (
              <Button onClick={() => window.systemAPI.startInstallUpdate()}>
                Instalar actualizacion
              </Button>
            )}

            {UpdateAvailableInfo?.version && (
              <Button onClick={() => window.systemAPI.startDownload()}>
                Descargar actualizacion
              </Button>
            )}
          </section>
        </section>
      </main>
    </>
  )
}

export default Info

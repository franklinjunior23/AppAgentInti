import React from 'react'
import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'
import { IconDeviceDesktop } from '@tabler/icons-react'

function Monitory() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg">
      <h3>Monitores Conectados : {datainformation.graphics.displays.length ?? 'Hubo un error'}</h3>
      <ul className="">
        {datainformation.graphics.displays.map((monitor, index) => (
          <li key={index} className="  bg-neutral-600 rounded-xl p-4 my-2 flex">
            <div>
              <h3>Conexion : {monitor.connection ?? ''}</h3>
              <h3>hz de pantalla : {monitor.currentRefreshRate ?? ''} hz</h3>
              <h3>
                Resolucion de pantalla : {monitor.resolutionX} x {monitor.resolutionY}
              </h3>
              <h3>Nombre : {monitor.deviceName ?? ''}</h3>
            </div>
            <IconDeviceDesktop size={40} />
          </li>
        ))}
      </ul>
    </SectionLayaout>
  )
}

export default Monitory

import React from 'react'
import SectionLayaout, { LabelItem } from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'
import { IconDeviceDesktop } from '@tabler/icons-react'
import { Card } from '@/components/ui/card'

function Monitory() {
  const { datainformation } = useDataSystem()
  return (
    <Card className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Monitores</h2>
      <h3>Monitores Conectados : {datainformation.graphics.displays.length ?? 'Hubo un error'}</h3>
      <ul className="">
        {datainformation.graphics.displays.map((monitor, index) => (
          <li
            key={index}
            className="  bg-neutral-600/30 rounded-xl p-4 my-2 flex justify-between items-center"
          >
            <div className="w-[75%]">
              <LabelItem label={'Nombre'} dataLabel={monitor.deviceName} />
              <LabelItem label={'Conexion'} dataLabel={monitor.connection} />
              <LabelItem label={'Hz'} dataLabel={monitor.currentRefreshRate} />
              <LabelItem
                label={'Resolucion'}
                dataLabel={`${monitor.resolutionX} x ${monitor.resolutionY}`}
              />
            </div>
            <IconDeviceDesktop size={40} />
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default Monitory

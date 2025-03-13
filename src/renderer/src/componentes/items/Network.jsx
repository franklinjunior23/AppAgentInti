import React from 'react'
import { useDataSystem } from '@/store/Use-data-system'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LabelItem } from './SectionLayaout'
import { IconWorld } from '@tabler/icons-react'

function Network() {
  const { datainformation } = useDataSystem()
  return (
    <Card className="">
      <CardHeader>
        <h2 className="text-2xl font-semibold ">Red</h2>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        {datainformation.networkInterfaces.map((networkInterface,index) => (
          <div key={index} className="my-2  bg-neutral-600/40 rounded-xl p-4">
            <LabelItem label={'Nombre'} dataLabel={networkInterface.iface} />
            <LabelItem label={'IP4'} dataLabel={networkInterface.ip4} />
            <LabelItem label={'IP6'} dataLabel={networkInterface.ip6} />
            <LabelItem label={'MAC'} dataLabel={networkInterface.mac} />
            <LabelItem label={'Tipo'} dataLabel={networkInterface.type} />
            <LabelItem label={'Velocidad'} dataLabel={networkInterface.speed} />
            <LabelItem label={'Estado'} dataLabel={networkInterface.operstate} />
            <LabelItem
              label={'DHCP'}
              dataLabel={networkInterface.dhcp ? 'Activado' : 'Desactivado'}
            />
            <LabelItem label={'Virtual'} dataLabel={networkInterface.virtual ? 'Si' : 'No'} />
            <IconWorld size={40} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default Network

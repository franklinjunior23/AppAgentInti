import { LabelItem } from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { IconServer } from '@tabler/icons-react'

function Storage() {
  const { datainformation } = useDataSystem()
  return (
    <Card className=" w-full">
      <CardHeader>
        <h2 className="text-2xl font-semibold ">Almacenamiento</h2>
      </CardHeader>
      <CardContent  className="w-full">
        <span>Discos Duros cantidad : {datainformation.diskLayout.length}</span>
        <ul className="w-full grid grid-cols-3 gap-3">
          {datainformation.diskLayout.map((disk, index) => (
            <li key={index} className="my-2  bg-neutral-600/40 rounded-xl p-4">
              <LabelItem label={'Nombre'} dataLabel={disk.name} />
              <LabelItem label={'Fabricante'} dataLabel={disk.vendor} />
              <LabelItem label={'Serial'} dataLabel={disk.firmwareRevision} />
              <LabelItem label={'Modelo'} dataLabel={disk.model} />
              <LabelItem
                label={'Tamaño'}
                dataLabel={`${Math.round((disk.size / 1073741824) * 100) / 100} GB`}
              />
              <LabelItem label={'Tipo'} dataLabel={disk.type} />
              <LabelItem label={'Interfaz'} dataLabel={disk.interfaceType} />
              <LabelItem label={'Revisión'} dataLabel={disk.firmwareRevision} />
              <LabelItem label={'Posición'} dataLabel={disk.interfaceType} />
              <IconServer size={40} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default Storage

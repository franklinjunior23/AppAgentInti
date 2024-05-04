import { IconRuler3 } from '@tabler/icons-react'
import { LabelItem } from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

function MemoryRam() {
  const { datainformation } = useDataSystem()
  return (
    <Card className="">
      <CardHeader>
        <h2 className="text-2xl font-semibold ">Memoria Ram</h2>
      </CardHeader>
      <CardContent>
        <h3>Cantidad de Memoria Ram : {datainformation.memLayout.length ?? ''}</h3>
        <ul>
          {datainformation.memLayout.map((Ram, index) => (
            <li
              key={index}
              className="  bg-neutral-600/30 rounded-xl p-4 my-2 flex justify-between items-center"
            >
              <div className="w-[70%]">
                <LabelItem label={'Tipo'} dataLabel={Ram.type} />
                <LabelItem label={'Serial'} dataLabel={Ram.serialNum} />
                <LabelItem
                  label={'Size'}
                  dataLabel={`${Math.round((Ram.size / 1073741824) * 100) / 100} GB`}
                />
                <LabelItem label={'mhz'} dataLabel={`${Ram.clockSpeed} mhz`} />
                <LabelItem label={'Banco'} dataLabel={Ram.bank} />
              </div>
              <IconRuler3 size={40} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default MemoryRam

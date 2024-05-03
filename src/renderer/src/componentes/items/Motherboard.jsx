import React from 'react'
import SectionLayaout, { LabelItem } from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

function Motherboard() {
  const { datainformation } = useDataSystem()
  return (
    <Card className=" ">
      <CardHeader>
        <h2 className="text-2xl font-semibold mb-2">Placa Madre</h2>
      </CardHeader>
      <CardContent>
        <LabelItem label={'Modelo'} dataLabel={datainformation.baseboard.model} />
        <LabelItem label={'Man.'} dataLabel={datainformation.baseboard.manufacturer} />
        <LabelItem label={'Serial'} dataLabel={datainformation.baseboard.serial} />
        <LabelItem label={'Slots de Ram'} dataLabel={datainformation.baseboard.memSlots} />
      </CardContent>
    </Card>
  )
}

export default Motherboard

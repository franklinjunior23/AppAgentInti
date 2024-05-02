import React from 'react'
import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'

function Motherboard() {
    const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="">
      <h2 className="text-2xl font-semibold mb-2">Placa Madre</h2>
      <h3>Placa madre : {datainformation.baseboard.model ?? 'Hubo un error'}</h3>
      <h3>Placa manofactura : {datainformation.baseboard.manufacturer ?? 'Hubo un error'}</h3>
      <h3>Serial : {datainformation.baseboard.serial ?? 'Hubo un error'}</h3>
      <h3>Slots de memoria : {datainformation.baseboard.memSlots ?? 'Hubo un error'}</h3>
    </SectionLayaout>
  )
}

export default Motherboard
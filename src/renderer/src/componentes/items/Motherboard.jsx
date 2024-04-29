import React from 'react'
import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'

function Motherboard() {
    const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg">
      <h2 className="text-2xl font-semibold py-2">Placa Madre</h2>
      <h3>Placa madre : {datainformation.baseboard.model ?? 'Hubo un error'}</h3>
      <h3>Placa manofactura : {datainformation.baseboard.manufacturer ?? 'Hubo un error'}</h3>
      <h3>Serial : {datainformation.baseboard.serial ?? 'Hubo un error'}</h3>
      <h3>Slots de memoria : {datainformation.baseboard.memSlots ?? 'Hubo un error'}</h3>
    </SectionLayaout>
  )
}

export default Motherboard
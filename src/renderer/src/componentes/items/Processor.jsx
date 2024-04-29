import React from 'react'
import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'

function Processor() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg">
      <h3>CPU : {datainformation.cpu.brand ?? 'Hubo un error'}</h3>
      <h3>Marca : {datainformation.cpu.manufacturer ?? 'Hubo un error'}</h3>
      <h3>Socket : {datainformation.cpu.socket ?? 'Hubo un error'}</h3>
      <h3>Nucleos : {datainformation.cpu.cores ?? 'Hubo un error'}</h3>
      <h3>Hilos : {datainformation.cpu.physicalCores ?? 'Hubo un error'}</h3>
      <h3>Virtualizacion : {datainformation.cpu.virtualization ? 'Activado' : 'Apagado'}</h3>
    </SectionLayaout>
  )
}

export default Processor

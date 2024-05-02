import React from 'react'
import SectionLayaout, { LabelItem } from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'

function Processor() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="">
      <h2 className="text-2xl font-semibold mb-2">Procesador</h2>
      <LabelItem label={'CPU'} dataLabel={datainformation.cpu.brand ?? 'Hubo un error'} />
      <LabelItem label={'Marca'} dataLabel={datainformation.cpu.manufacturer ?? 'Hubo un error'} />
      <LabelItem
        label={'Virtualizacion'}
        dataLabel={datainformation.cpu.virtualization ? 'Activado' : 'Apagado'}
      />
      <LabelItem
        label={'Socket'}
        dataLabel={
          datainformation.cpu.socket === ''
            ? 'no registrado'
            : datainformation.cpu.socket ?? 'Hubo un error'
        }
      />
      <LabelItem label={'Nucleos'} dataLabel={datainformation.cpu.cores ?? 'Hubo un error'} />
      <LabelItem label={'Hilos'} dataLabel={datainformation.cpu.physicalCores ?? 'Hubo un error'} />
    </SectionLayaout>
  )
}

export default Processor

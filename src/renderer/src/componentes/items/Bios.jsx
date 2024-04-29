import React from 'react'
import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'

function Bios() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout>
      <h3 className="text-center text-xl py-2">bios</h3>
      <h3>release data : {datainformation.bios.releaseDate ?? ''}</h3>
      <h3>Marca : {datainformation.bios.vendor ?? ''}</h3>
      <h3>Version : {datainformation.bios.version ?? ''}</h3>
    </SectionLayaout>
  )
}

export default Bios

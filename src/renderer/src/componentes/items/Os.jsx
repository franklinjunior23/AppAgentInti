import React from 'react'
import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'

function Os() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg">
      <h2 className="text-2xl font-semibold py-2">Sistema Operativo</h2>
      <h3>Sistema Operativo :{datainformation.os.platform ?? 'Hubo un error'}</h3>
      <h3>bits : {datainformation.os.arch ?? 'Hubo un error'}</h3>
      <h3>distro : {datainformation.os.distro ?? 'Hubo un error'}</h3>
      <h3>Nombre Pc : {datainformation.os.hostname ?? 'Hubo un error'}</h3>
      <h3>Serial : {datainformation.os.serial ?? 'Hubo un error'}</h3>
    </SectionLayaout>
  )
}

export default Os

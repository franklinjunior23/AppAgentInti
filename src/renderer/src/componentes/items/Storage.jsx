import React from 'react'
import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'

function Storage() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="">
      <h1 className="text-center text-2xl">Discos Duros</h1>
      <h3>Discos Duros cantidad : {datainformation.diskLayout.length}</h3>
      <ul className="w-full grid grid-cols-3 gap-5">
        {datainformation.diskLayout.map((disk, index) => (
          <li key={index} className="my-2  bg-neutral-600 rounded-xl p-4">
            <h3>nombre : {disk.name ?? ''}</h3>
            <h3>Tamaño : {Math.round((disk.size / 1073741824) * 100) / 100 ?? ''} GB</h3>
            <h3>ifsTyped : {disk.type ?? ''}</h3>
            <h3> physical : {disk.interfaceType ?? ''}</h3>
            <h3>Marca : {disk.vendor ?? ''}</h3>
            <h3>Serial : {disk.firmwareRevision ?? ''}</h3>
            <h3>Posicion : {disk.interfaceType ?? ''}</h3>
          </li>
        ))}
      </ul>
    </SectionLayaout>
  )
}

export default Storage

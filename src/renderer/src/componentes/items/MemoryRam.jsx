import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'

function MemoryRam() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="">
      <h3>Cantidad de Memoria Ram : {datainformation.memLayout.length ?? ''}</h3>
      <ul>
        {datainformation.memLayout.map((Ram, index) => (
          <li key={index} className="  bg-neutral-600 rounded-xl p-4 my-2 ">
            <div>
              <h3>Tipo : {Ram.type ?? ''}</h3>
              <h3>Serial : {Ram.partNum ?? ''} </h3>
              <h3>Size : {Math.round((Ram.size / 1073741824) * 100) / 100} GB</h3>
              <h3>mhz : {Ram.clockSpeed ?? ''} mhz</h3>
              <h3>Banco : {Ram.bank ?? ''} </h3>
            </div>
          </li>
        ))}
      </ul>
    </SectionLayaout>
  )
}

export default MemoryRam

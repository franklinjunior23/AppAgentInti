import { useDataSystem } from '@/store/Use-data-system'
import SectionLayaout from './SectionLayaout'

function Network() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="grid grid-cols-2 gap-5">
      {datainformation.networkInterfaces.map((networkInterface) => (
        <div key={networkInterface.mac} className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{networkInterface.iface}</h2>
          <div>
            <span className="font-semibold">IP4:</span> {networkInterface.ip4}
          </div>
          <div>
            <span className="font-semibold">IP6:</span> {networkInterface.ip6}
          </div>
          <div>
            <span className="font-semibold">MAC:</span> {networkInterface.mac}
          </div>
          <div>
            <span className="font-semibold">Tipo:</span> {networkInterface.type}
          </div>
          <div>
            <span className="font-semibold">Velocidad:</span> {networkInterface.speed}
          </div>
          <div>
            <span className="font-semibold">Estado:</span> {networkInterface.operstate}
          </div>
          <div>
            <span className="font-semibold">Dhcp estado :</span>
            {networkInterface.dhcp ? 'Activado' : 'Desactivado'}
          </div>
          <div>
            <span className="font-semibold">virtual:</span> {networkInterface.virtual ? 'Si' : 'No'}
          </div>
        </div>
      ))}
    </SectionLayaout>
  )
}

export default Network

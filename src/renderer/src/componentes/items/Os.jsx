import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'

function Os() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout className="p-5  rounded-lg">
      <h2 className="text-2xl font-semibold py-2">Sistema Operativo</h2>

      <h3>Sistema Operativo :{datainformation.osInfo.platform ?? 'Hubo un error'}</h3>
      <h3>bits : {datainformation.osInfo.arch ?? 'Hubo un error'}</h3>
      <h3>distro : {datainformation.osInfo.distro ?? 'Hubo un error'}</h3>
      <h3>Nombre Pc : {datainformation.osInfo.hostname ?? 'Hubo un error'}</h3>
      <h3>Serial : {datainformation.osInfo.serial ?? 'Hubo un error'}</h3>
    </SectionLayaout>
  )
}

export default Os

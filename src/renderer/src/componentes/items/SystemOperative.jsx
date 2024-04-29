import SectionLayaout from './SectionLayaout'
import { IconBrandWindows } from '@tabler/icons-react'
import { useDataSystem } from '@/store/Use-data-system'

function SystemOperative() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout>
      <>
        Sistema Operativo
        <span className="text-xl flex justify-center font-semibold items-center">
          {datainformation.os.platform ?? 'Hubo un error'}
          <IconBrandWindows size={40} />
        </span>
        <h3 className="text-sm">{datainformation.os.distro ?? 'Hubo un error'}</h3>
        <h3>Arquitectura : {datainformation.os.arch}</h3>
        <h3>Version : {datainformation.os.release}</h3>
        <h3>Kernel : {datainformation.os.kernel}</h3>
      </>
    </SectionLayaout>
  )
}

export default SystemOperative

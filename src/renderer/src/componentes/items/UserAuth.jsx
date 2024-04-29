import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'
import { IconUser } from '@tabler/icons-react'

function UserAuth() {
  const { datainformation } = useDataSystem()
  return (
    <SectionLayaout>
      <h3>
        Usuario Logeado
        <span className="flex justify-center gap-2 font-semibold text-xl items-center">
          {datainformation.currentUser ?? ''} <IconUser size={40} />
        </span>
        <span className="text-sm">{datainformation.os.hostname ?? 'Hubo un error'}</span>
      </h3>
    </SectionLayaout>
  )
}

export default UserAuth

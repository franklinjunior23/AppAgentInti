import SectionLayaout from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'
import { IconUser } from '@tabler/icons-react'

function UserAuth() {
  const { datainformation } = useDataSystem()
  return (
    <div>
      <h3 className="text-center">Usuario Logeado </h3>
      <span className="flex  gap-2 font-semibold text-xl items-center justify-center bg-white/20 p-1 rounded-lg my-1">
        {datainformation.currentUser ?? ''}{' '}
        <IconUser size={30} className="bg-white rounded-full text-black p-1 " />
      </span>
      <h4 className="text-sm text-center">{datainformation.osInfo.hostname ?? 'Hubo un error'}</h4>
    </div>
  )
}

export default UserAuth

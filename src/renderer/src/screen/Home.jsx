import { useDataSystem } from '../store/Use-data-system'
import UserAuth from '@/componentes/items/UserAuth'
import SystemOperative from '@/componentes/items/SystemOperative'
import MemoryRam from '@/componentes/items/MemoryRam'
import Os from '@/componentes/items/Os'
import Monitory from '@/componentes/items/Monitory'
import Bios from '@/componentes/items/Bios'
import Storage from '@/componentes/items/Storage'
import Processor from '@/componentes/items/Processor'

function Home() {
  const { datainformation } = useDataSystem()
  if (!datainformation) return <h2>Cargando ...</h2>
  return (
    <>
      <main className=" text-white ">
        <header className="grid grid-cols-2 gap-6 ">
          <UserAuth />
          <SystemOperative />
        </header>
        <section className="grid grid-cols-2 gap-2 text-sm mt-4">
          <Os />
          <Processor />
          <Monitory />
          <MemoryRam />
          <Bios />
        </section>
        <Storage />
      </main>
    </>
  )
}

export default Home

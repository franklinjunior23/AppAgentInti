import { useDataSystem } from '../store/Use-data-system'
import UserAuth from '@/componentes/items/UserAuth'
import SystemOperative from '@/componentes/items/SystemOperative'
import MemoryRam from '@/componentes/items/MemoryRam'
import Os from '@/componentes/items/Os'
import Monitory from '@/componentes/items/Monitory'
import Bios from '@/componentes/items/Bios'
import Storage from '@/componentes/items/Storage'
import Processor from '@/componentes/items/Processor'
import Network from '@/componentes/items/Network'
import Motherboard from '@/componentes/items/Motherboard'
import SectionLayaout from '@/componentes/items/SectionLayaout'
import { Separator } from '@/components/ui/separator'

function Home() {
  const { datainformation } = useDataSystem()
  if (!datainformation) return <h2>Cargando ...</h2>
  return (
    <>
      <main className=" text-white ">
        <main className="px-4">
          <SectionLayaout
            className={
              'dark:bg-gradient-to-r from-indigo-500/40  from-10% via-sky-500/40 via-30% to-emerald-500/40 to-90%0 flex justify-between items-center '
            }
          >
            <SystemOperative />
            <Separator className="h-[200px]  bg-white/20 w-0.5 " />
            <UserAuth />
          </SectionLayaout>
        </main>
        <section className="grid grid-cols-2 gap-2 text-sm mt-4">
          <Motherboard />
          <Processor />
          <Monitory />
          <MemoryRam />
          <Bios />
        </section>
        <Storage />
        <Network />
      </main>
    </>
  )
}

export default Home

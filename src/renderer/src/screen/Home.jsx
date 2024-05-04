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
              'bg-gradient-to-r dark:from-indigo-500/50  from-indigo-500 from-10% dark:via-sky-500/40 via-sky-500  via-30% dark:to-emerald-500/50 to-emerald-500 to-90%0 flex justify-between items-center '
            }
          >
            <SystemOperative />
            <Separator className="h-[200px]  bg-white/20 w-0.5 " />
            <UserAuth />
          </SectionLayaout>
        </main>

        <main className="px-4 ">
          <div className="grid grid-cols-2 my-4 gap-5">
            <Motherboard />
            <Processor />
          </div>
          <main className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Monitory />
              <Bios />
            </div>
            <div className="flex flex-col gap-4">
              <MemoryRam />
            </div>
          </main>
          <main className="flex flex-col gap-4 pb-4 mt-4">
            <Storage />
            <Network />
          </main>
        </main>
      </main>
    </>
  )
}

export default Home

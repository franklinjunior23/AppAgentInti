import {
  IconBrandTidal,
  IconDownload,
  IconInfoSquareRounded,
  IconLifebuoy,
  IconLogout,
  IconSettings
} from '@tabler/icons-react'
// import { BarStorage } from '../store/HeadBar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { DataInformationPC } from '../store'
import { IconLayoutDashboard } from '@tabler/icons-react'

function Header() {
  // const { bar } = BarStorage()
  const { data, AddData } = DataInformationPC()

  const PathLinks = [
    { name: 'Dashboard', path: '/', icon: <IconLayoutDashboard /> },
    { name: 'Configuracion', path: '/Setting', icon: <IconSettings /> },
    { name: 'Actualizacion', path: '/Update', icon: <IconDownload /> },
    { name: 'Ayuda', path: '/Help', icon: <IconInfoSquareRounded /> },
    { name: 'Soporte', path: '/Support', icon: <IconLifebuoy /> }
  ]

  useEffect(() => {
    async function getInfo() {
      window.systemAPI.getInfo().then((systemReport) => {
        console.log('Información del sistema:', systemReport)
        AddData(...systemReport)
      })

      setTimeout(() => {
        window.systemAPI.getInfo().then((systemReport) => {
          console.log('Información del sistema:', systemReport)
          AddData(...systemReport)
        })
      }, 300000)
    }
    getInfo()
  }, [])
  if (data.length === 0) return <h3 className="text-center mt-5">Cargando ....</h3>
  return (
    <aside className=" fixed h-screen left-0 top-0 w-[245px] py-4 pl-5">
      <header className="bg-[#292929]/80 w-[100%] h-[100%] rounded-xl p-4 flex flex-col justify-between">
        <header className="flex gap-3 flex-col justify-between h-full">
          <section>
            <div className="flex justify-center items-center text-white text-xl gap-2 py-5">
              <h1 className="text-center text-2xl font-bold">AgenteSoft </h1>{' '}
              <IconBrandTidal size={32} />
            </div>
            {/* <img
            src="https://cdn-icons-png.flaticon.com/512/8759/8759045.png"
            className=" w-[100px] mx-auto"
            alt=""
          /> */}
            <main className="mt-4  grid gap-2">
              {PathLinks.map((Url, index) => (
                <Link
                  to={Url.path}
                  className="px-3 py-3 cursor-pointer rounded-lg hover:bg-slate-500/20 flex items-center text-white gap-5 "
                  key={index}
                >
                  {Url.icon} <h3 className="font-semibold text-base">{Url.name}</h3>
                </Link>
              ))}
            </main>
          </section>
          <footer>
            <header className="flex justify-between">
              <div className="flex gap-3 items-end">
                <img src="/ImageUserLog.avif" className="w-12 rounded-lg" alt="" />
                <div className="">
                  <h3 className="text-white font-semibold text-lg">Soporte Ti</h3>
                  <span className="items-end text-white text-xs">Soporte</span>
                </div>
              </div>
              <IconLogout className="self-center text-white" />
            </header>
          </footer>
        </header>

        {/* <button className=" hover:bg-slate-500/20 rounded-lg px-3 flex justify-center items-center gap-2  py-2 text-white">
          <IconLogout /> {bar !== true && <h3 className="">Sign Out</h3>}
        </button> */}
      </header>
    </aside>
  )
}

export default Header

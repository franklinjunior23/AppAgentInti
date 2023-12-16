import {
  IconBrandTidal,
  IconInfoSquareRounded,
  IconLogout,
  IconSettings,
  IconSmartHome
} from '@tabler/icons-react'
import { BarStorage } from '../store/HeadBar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { DataInformationPC } from '../store'

function Header() {
  const { bar } = BarStorage()
  const { data, AddData } = DataInformationPC()

  const PathLinks = [
    { name: 'Dashboard', path: '/', icon: <IconSmartHome /> },
    { name: 'Setting', path: '/Setting', icon: <IconSettings /> },
    { name: 'Help', path: '/Help', icon: <IconInfoSquareRounded /> }
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
        <header className="flex gap-3 flex-col">
          <div className="flex justify-center items-center text-white text-xl gap-2 py-3">
            <h1 className="text-center ">AgenteSoft </h1> <IconBrandTidal />
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/8759/8759045.png"
            className=" w-[100px] mx-auto"
            alt=""
          />
          <main className="mt-4  grid gap-2">
            {PathLinks.map((Url, index) => (
              <Link
                to={Url.path}
                className="px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-500/20 flex items-center text-white gap-5 "
                key={index}
              >
                {Url.icon} <h3 className="font-semibold text-base">{Url.name}</h3>
              </Link>
            ))}
          </main>
        </header>

        {/* <button className=" hover:bg-slate-500/20 rounded-lg px-3 flex justify-center items-center gap-2  py-2 text-white">
          <IconLogout /> {bar !== true && <h3 className="">Sign Out</h3>}
        </button> */}
      </header>
    </aside>
  )
}

export default Header

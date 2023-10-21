import {
  IconBrandTidal,
  IconInfoSquareRounded,
  IconLogout,
  IconSettings,
  IconSmartHome
} from '@tabler/icons-react'
import { BarStorage } from '../store/HeadBar'
import { Link } from 'react-router-dom'

function Header() {
  const { bar } = BarStorage()
  const PathLinks = [
    { name: 'Dashboard', path: '/Dashboard', icon: <IconSmartHome /> },
    { name: 'Setting', path: '/Setting', icon: <IconSettings /> },
    { name: 'Help', path: '/Help', icon: <IconInfoSquareRounded /> }
  ]

  return (
    <aside className=" fixed h-screen left-0 top-0 w-[245px] py-4 pl-5">
      <header className="bg-[#292929]/80 w-[100%] h-[100%] rounded-xl p-4 flex flex-col justify-between">
        <head className="flex gap-3 flex-col">
          <div className="flex justify-center items-center text-white text-xl gap-2 py-3">
            <h1 className="text-center ">AgenteSoft </h1> <IconBrandTidal />
          </div>
          <main className=" mt-8 grid gap-2">
            {PathLinks.map((Url, index) => (
              <Link
                to={Url.path}
                className="px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-500/20 flex items-center text-white gap-5 "
                key={index}
              >
                {Url.icon} <h3>{Url.name}</h3>
              </Link>
            ))}
          </main>
        </head>

        <button className=" hover:bg-slate-500/20 rounded-lg px-3 flex justify-center items-center gap-2  py-2 text-white">
          <IconLogout /> {bar !== true && <h3 className="">Sign Out</h3>}
        </button>
      </header>
    </aside>
  )
}

export default Header

import {
  IconBrandTidal,
  IconDownload,
  IconInfoSquareRounded,
  IconLifebuoy,
  IconLogout,
  IconSettings
} from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'
import { IconLayoutDashboard } from '@tabler/icons-react'
import ImageUser from '../images/ImageUserLog.avif'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
function Header() {
  // const { bar } = BarStorage()

  const PathLinks = [
    { name: 'Dashboard', path: '/', icon: <IconLayoutDashboard size={24} strokeWidth={1.5} /> },
    { name: 'Configuracion', path: '/Setting', icon: <IconSettings size={24} strokeWidth={1.5} /> },
    { name: 'Actualizacion', path: '/Update', icon: <IconDownload size={24} strokeWidth={1.5} /> },
    { name: 'Ayuda', path: '/Help', icon: <IconInfoSquareRounded size={24} strokeWidth={1.5} /> },
    { name: 'Soporte', path: '/Support', icon: <IconLifebuoy size={24} strokeWidth={1.5} /> },
    { name: 'Reporte', path: '/Report', icon: <IconLifebuoy size={24} strokeWidth={1.5} /> }
  ]
  return (
    <aside className="w-[250px] bg-white/60 ">
      <header className=" h-screen  flex flex-col justify-between">
        <header className="flex gap-3 flex-col justify-between h-full">
          <section className="mt-5">
            <div className="flex pl-6 items-center bg-ColorSystem gap-2 py-2 text-white">
              <IconBrandTidal size={32} />
              <h3 className="font-semibold text-xl">Intiscorp</h3>
            </div>
            <main className="mt-4  grid">
              {PathLinks.map((Url, index) => (
                <NavLink
                  to={Url.path}
                  className={({ isActive }) => {
                    return isActive
                      ? 'bg-black/[4%] py-3 cursor-pointer font-semibold hover:bg-slate-500/20 flex items-center gap-3 before:bg-ColorSystem before:mr-2 before:content-[attr(data-icon)] before:w-1 before:h-6 before:rounded-lg before:flex before:items-center before:justify-between     transition-colors duration-500 ease-in-out pl-1'
                      : ' py-3  cursor-pointer hover:bg-black/[4%] before:mr-2 before:content-[attr(data-icon)] before:w-1 hover:before:h-6 before:rounded-lg before:flex before:items-center before:justify-between before:bg-ColorSystem   flex items-center gap-3 transition-colors duration-500 ease-in-out pl-1'
                  }}
                  key={index}
                >
                  {Url.icon} <h3 className=" font-light text-xs">{Url.name}</h3>
                </NavLink>
              ))}
            </main>
          </section>
          <footer>
            <header className="flex justify-between">
              <div className="flex gap-3 items-end">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img src={ImageUser} className="w-12 rounded-lg" alt="" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

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

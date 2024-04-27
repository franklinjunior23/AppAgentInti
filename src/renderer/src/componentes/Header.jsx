import {
  IconBrandTidal,
  IconDownload,
  IconInfoSquareRounded,
  IconLifebuoy,
  IconLogout,
  IconSettings,
  IconSmartHome,
  IconUsers
} from '@tabler/icons-react'
import { Link, NavLink } from 'react-router-dom'
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
function Header() {
  // const { bar } = BarStorage()

  const PathLinks = [
    { name: 'Dashboard', path: '/', icon: <IconSmartHome size={24} strokeWidth={1.5} /> },
    {
      name: 'Aplicaciones',
      path: '/aplications',
      icon: <IconLayoutDashboard size={24} strokeWidth={1.5} />
    },
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
                      ? 'bg-black/[4%] py-3 cursor-pointer font-semibold hover:bg-slate-500/20 flex items-center gap-3 before:bg-ColorSystem before:mr-2 before:content-[attr(data-icon)] before:w-1 before:h-6 before:rounded-lg before:flex before:items-center before:justify-between  transition-colors duration-500 ease-in-out pl-1'
                      : ' py-3  cursor-pointer hover:bg-black/[4%] before:mr-2 before:content-[attr(data-icon)] before:w-1 hover:before:h-6 before:rounded-lg before:flex before:items-center before:justify-between before:bg-ColorSystem   flex items-center gap-3 transition-colors duration-500 ease-in-out pl-1 font-light'
                  }}
                  key={index}
                >
                  {Url.icon} <h3 className="  text-xs">{Url.name}</h3>
                </NavLink>
              ))}
            </main>
          </section>
          <footer>
            <header className=" border-t border-black/[5%]">
              <div className="flex justify-center gap-3 items-center py-3">
                <div className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="p-2">
                            <IconUsers size={24} strokeWidth={1.5} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Perfil</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
                </div>
                <div className="p-2 grid place-content-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to={'/Setting'}>
                          <IconSettings size={24} strokeWidth={1.5} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Configuracion</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </header>
          </footer>
        </header>
      </header>
    </aside>
  )
}

export default Header

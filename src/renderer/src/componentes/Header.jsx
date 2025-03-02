import { IconBrandTidal, IconSettings, IconUsers } from '@tabler/icons-react'
import { Link, NavLink } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DataNavbar } from '@/data/Navbar.data'

function Header() {
  return (
    <aside className="w-[60px] bg-white/60 dark:bg-black/80 ">
      <header className=" h-screen  flex flex-col justify-between">
        <header className="flex gap-3 flex-col justify-between h-full">
          <section className="mt-5">
            <div className="flex justify-center items-center bg-ColorSystem gap-2 py-2 text-white">
              <IconBrandTidal size={32} />
            </div>
            <main className="mt-4  grid gap-1">
              {DataNavbar.map((Url, index) => (
                <NavLink
                  to={Url.path}
                  className={({ isActive }) => {
                    return isActive
                      ? 'bg-black/[4%] dark:bg-black/50 py-2 cursor-pointer font-semibold hover:bg-slate-500/20 flex items-center gap-3 before:bg-ColorSystem before:content-[attr(data-icon)] before:w-1 before:h-6 before:rounded-lg before:flex before:items-center before:justify-between  transition-colors duration-500 ease-in-out '
                      : ' py-2  cursor-pointer hover:bg-black/[4%] dark:hover:bg-black/50  before:content-[attr(data-icon)] before:w-1 hover:before:h-6 before:rounded-lg before:flex before:items-center before:justify-between before:bg-ColorSystem   flex items-center gap-3 transition-colors duration-500 ease-in-out  font-light'
                  }}
                  key={index}
                >
                  {Url.icon}
                </NavLink>
              ))}
            </main>
          </section>
          <footer>
            <header className=" border-t border-black/[5%] dark:border-white/20">
              <div className="flex  flex-col justify-center gap-3 items-center py-3">
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
                      <DropdownMenuItem>Information</DropdownMenuItem>
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

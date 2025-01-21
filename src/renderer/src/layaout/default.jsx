import Header from '@/componentes/Header'
import { Outlet } from 'react-router-dom'

function Layaout() {
  return (
    <>
      <main className=" w-screen h-screen overflow-x-hidden flex">
        <Header />
        <main className="h-full w-full dark:bg-black ScroolLayaot overflow-y-auto bg-white ">
          <Outlet />
        </main>
      </main>
    </>
  )
}

export default Layaout

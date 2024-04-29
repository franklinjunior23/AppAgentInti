import Header from '../componentes/Header'
import { Outlet } from 'react-router-dom'

function Layaout() {
  return (
    <>
      <main className=" w-screen h-screen overflow-x-hidden flex">
        <Header />
        <main className="p-2 h-full w-full ScroolLayaot overflow-y-auto bg-white ">
          <Outlet />
        </main>
      </main>
    </>
  )
}

export default Layaout

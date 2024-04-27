import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function Layaout() {
  return (
    <>
      <main className=" w-screen h-screen overflow-x-hidden flex">
        <Header />
        <main className="ml-[250px] p-4 h-full ScroolLayaot overflow-y-auto">
          <Outlet />
        </main>
      </main>
    </>
  )
}

export default Layaout

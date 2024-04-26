import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function Layaout() {
  return (
    <>
      <main className="bg-black/80 w-screen h-screen overflow-x-hidden">
        <Header />
        <main className="ml-[250px] p-4 h-full ScroolLayaot overflow-y-auto">
          <Outlet />
        </main>
      </main>
    </>
  )
}

export default Layaout

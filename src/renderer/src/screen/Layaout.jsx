import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function Layaout() {
  return (
    <>
      <Header />
      <main className="ml-[250px] p-4 h-full ScroolLayaot overflow-y-auto">
        <Outlet />
      </main>
    </>
  )
}

export default Layaout

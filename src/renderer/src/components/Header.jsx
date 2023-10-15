function Header() {
  return (
    <aside className=" fixed h-screen left-0 top-0 w-[240px] py-4 pl-5">
      <header className="bg-[#292929]/70 w-[100%] h-[100%] rounded-xl p-2 flex flex-col justify-between">
        <head className="flex justify-center items-center gap-3">
          <img
            src="https://www.intiscorp.com.pe/wp-content/uploads/2022/10/1-1-1.png"
            alt="imagen logo"
            width={20}
            height={20}
          />
          <span className="text-center text-white font-bold">AgentInti </span>
        </head>
        <section className=" bg-slate-500/50">
          <h3>Sign Up</h3>
        </section>
      </header>
    </aside>
  )
}

export default Header

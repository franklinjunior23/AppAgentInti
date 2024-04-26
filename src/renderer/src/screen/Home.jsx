import { IconBrandWindows, IconDeviceDesktop, IconUser } from '@tabler/icons-react'
import SectionLayaout from '../components/SectionLayaout'
import { useDataSystem } from '../store/Use-data-system'

function Home() {
  const { datainformation } = useDataSystem()
  if (!datainformation) return <h2>Cargabdi ,,</h2>
  return (
    <>
      <main className=" text-white ">
        <header className="grid grid-cols-2 gap-6 ">
          <SectionLayaout>
            <h3>
              Usuario Logeado
              <span className="flex justify-center gap-2 font-semibold text-xl items-center">
                {datainformation.currentUser ?? ''} <IconUser size={40} />
              </span>
              <span className="text-sm">{datainformation.osInfo.hostname ?? 'Hubo un error'}</span>
            </h3>
          </SectionLayaout>
          <SectionLayaout>
            <h3>
              Sistema Operativo
              <span className="text-xl flex justify-center font-semibold items-center">
                {datainformation.osInfo.platform ?? 'Hubo un error'}
                <IconBrandWindows size={40} />
              </span>
              <span className="text-sm">{datainformation.osInfo.distro ?? 'Hubo un error'}</span>
            </h3>
          </SectionLayaout>
        </header>
        <section className="grid grid-cols-2 gap-2 text-sm mt-4">
          <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg">
            <h2 className="text-2xl font-semibold py-2">Placa Madre</h2>
            <h3>Placa madre : {datainformation.baseboard.model ?? 'Hubo un error'}</h3>
            <h3>Placa manofactura : {datainformation.baseboard.manufacturer ?? 'Hubo un error'}</h3>
            <h3>Serial : {datainformation.baseboard.serial ?? 'Hubo un error'}</h3>
            <h3>Slots de memoria : {datainformation.baseboard.memSlots ?? 'Hubo un error'}</h3>
          </SectionLayaout>
          <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg">
            <h2 className="text-2xl font-semibold py-2">Sistema Operativo</h2>
            <h3>Sistema Operativo :{datainformation.osInfo.platform ?? 'Hubo un error'}</h3>
            <h3>bits : {datainformation.osInfo.arch ?? 'Hubo un error'}</h3>
            <h3>distro : {datainformation.osInfo.distro ?? 'Hubo un error'}</h3>
            <h3>Nombre Pc : {datainformation.osInfo.hostname ?? 'Hubo un error'}</h3>
            <h3>Serial : {datainformation.osInfo.serial ?? 'Hubo un error'}</h3>
          </SectionLayaout>
          <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg">
            <h3>CPU : {datainformation.cpu.brand ?? 'Hubo un error'}</h3>
            <h3>Marca : {datainformation.cpu.manufacturer ?? 'Hubo un error'}</h3>
            <h3>Socket : {datainformation.cpu.socket ?? 'Hubo un error'}</h3>
            <h3>Nucleos : {datainformation.cpu.cores ?? 'Hubo un error'}</h3>
            <h3>Hilos : {datainformation.cpu.physicalCores ?? 'Hubo un error'}</h3>
          </SectionLayaout>
          <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg">
            <h3>
              Monitores Conectados : {datainformation.graphics.displays.length ?? 'Hubo un error'}
            </h3>
            <ul className="">
              {datainformation.graphics.displays.map((monitor, index) => (
                <li key={index} className="  bg-neutral-600 rounded-xl p-4 my-2 flex">
                  <div>
                    <h3>Conexion : {monitor.connection ?? ''}</h3>
                    <h3>hz de pantalla : {monitor.currentRefreshRate ?? ''} hz</h3>
                    <h3>
                      Resolucion de pantalla : {monitor.resolutionX} x {monitor.resolutionY}
                    </h3>
                    <h3>Nombre : {monitor.deviceName ?? ''}</h3>
                  </div>
                  <IconDeviceDesktop size={40} />
                </li>
              ))}
            </ul>
          </SectionLayaout>
          <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg">
            <h3>Cantidad de Memoria Ram : {datainformation.memLayout.length ?? ''}</h3>
            <ul>
              {datainformation.memLayout.map((Ram, index) => (
                <li key={index} className="  bg-neutral-600 rounded-xl p-4 my-2 ">
                  <div>
                    <h3>Tipo : {Ram.type ?? ''}</h3>
                    <h3>Serial : {Ram.partNum ?? ''} </h3>
                    <h3>Size : {Math.round((Ram.size / 1073741824) * 100) / 100} GB</h3>
                    <h3>mhz : {Ram.clockSpeed ?? ''} mhz</h3>
                    <h3>Banco : {Ram.bank ?? ''} </h3>
                  </div>
                </li>
              ))}
            </ul>
          </SectionLayaout>
          <SectionLayaout>
            <h3 className="text-center text-xl py-2">bios</h3>
            <h3>release data : {datainformation.bios.releaseDate ?? ''}</h3>
            <h3>Marca : {datainformation.bios.vendor ?? ''}</h3>
            <h3>Version : {datainformation.bios.version ?? ''}</h3>
          </SectionLayaout>
        </section>
        <SectionLayaout className="p-5 bg-slate-600/30 rounded-lg mt-5">
          <h1 className="text-center text-2xl">Discos Duros</h1>
          <h3>Discos Duros cantidad : {datainformation.blockDevices.length}</h3>
          <ul className="w-full grid grid-cols-3 gap-5">
            {datainformation.blockDevices.map((disk, index) => (
              <li key={index} className="my-2  bg-neutral-600 rounded-xl p-4">
                <h3>nombre : {disk.name ?? ''}</h3>
                <h3>serial : {Math.round((disk.size / 1073741824) * 100) / 100 ?? ''} GB</h3>
                <h3>ifsTyped : {disk.fsType ?? ''}</h3>
                <h3> physical : {disk.physical ?? ''}</h3>
                <h3>id : {disk.uuid ?? ''}</h3>
              </li>
            ))}
          </ul>
        </SectionLayaout>
      </main>
    </>
  )
}

export default Home

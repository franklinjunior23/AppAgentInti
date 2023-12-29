import { useEffect } from 'react'
import Header from '../components/Header'
import { DataInformationPC } from '../store'
import { IconBrandWindows, IconDeviceDesktop, IconUser } from '@tabler/icons-react'
import { AxiosRest } from '../helpers/ApiConfig'
import { toast } from 'react-toastify'

function Home() {
  const { data, AddData, iDDispositivo } = DataInformationPC()

  useEffect(() => {
    async function getInfo() {
      window.systemAPI.getInfo().then((systemReport) => {
        console.log('Información del sistema:', systemReport)
        AddData(...systemReport)
      })

      setTimeout(() => {
        window.systemAPI.getInfo().then((systemReport) => {
          console.log('Información del sistema:', systemReport)
          AddData(...systemReport)
        })
      }, 300000)
      /// cada 5 minutos
    }
    getInfo()

    setInterval(
      () => {
        sendSystemInfo(iDDispositivo, data)
      },
      5.0 * 60 * 1000
    )

    return () => clearInterval(getInfo())
  }, [data])
  if (data.length === 0) return <h3 className="text-center mt-5">Cargando ....</h3>
  return (
    <>
      <Header />

      <main className="ml-[250px] p-4 text-white">
        <h1 className="text-center bg-black/50 py-4 rounded-lg text-xl font-semibold tracking-wide	">
          Informacion de la pc
        </h1>
        {data.length === 0 && <h3 className="text-center mt-5">Cargando ....</h3>}
        <header className="grid grid-cols-2 gap-6">
          <div className="bg-black/60 mt-4 p-5 rounded-lg text-center">
            <h3>
              Usuario Logeado
              <span className="flex justify-center font-semibold text-xl items-center">
                {data[0].currentUser ?? ''} <IconUser size={40} />
              </span>
            </h3>
          </div>
          <div className="bg-black/60 mt-4 p-5 rounded-lg text-center">
            <h3>
              Sistema Operativo
              <span className="text-xl flex justify-center font-semibold items-center">
                {data[0].osInfo.platform ?? 'Hubo un error'}
                <IconBrandWindows size={40} />
              </span>
              <span className="text-sm">{data[0].osInfo.distro ?? 'Hubo un error'}</span>
            </h3>
          </div>
        </header>
        <section className="grid grid-cols-2 gap-2 text-sm mt-4">
          <div className="p-5 bg-slate-600/30 rounded-lg">
            <h3>Placa madre : {data[0].baseboard.model ?? 'Hubo un error'}</h3>
            <h3>Placa manofactura : {data[0].baseboard.manufacturer ?? 'Hubo un error'}</h3>
            <h3>Serial : {data[0].baseboard.serial ?? 'Hubo un error'}</h3>
            <h3>Slots de memoria : {data[0].baseboard.memSlots ?? 'Hubo un error'}</h3>
          </div>
          <div className="p-5 bg-slate-600/30 rounded-lg">
            <h3>Sistema Operativo :{data[0].osInfo.platform ?? 'Hubo un error'}</h3>
            <h3>bits : {data[0].osInfo.arch ?? 'Hubo un error'}</h3>
            <h3>distro : {data[0].osInfo.distro ?? 'Hubo un error'}</h3>
            <h3>Nombre Pc : {data[0].osInfo.hostname ?? 'Hubo un error'}</h3>
            <h3>Serial : {data[0].osInfo.serial ?? 'Hubo un error'}</h3>
          </div>
          <div className="p-5 bg-slate-600/30 rounded-lg">
            <h3>CPU : {data[0].cpu.brand ?? 'Hubo un error'}</h3>
            <h3>Marca : {data[0].cpu.manufacturer ?? 'Hubo un error'}</h3>
            <h3>Socket : {data[0].cpu.socket ?? 'Hubo un error'}</h3>
            <h3>Nucleos : {data[0].cpu.cores ?? 'Hubo un error'}</h3>
            <h3>Hilos : {data[0].cpu.physicalCores ?? 'Hubo un error'}</h3>
          </div>
          <div className="p-5 bg-slate-600/30 rounded-lg">
            <h3>Monitores Conectados : {data[0].graphics.displays.length ?? 'Hubo un error'}</h3>
            <ul className="">
              {data[0].graphics.displays.map((monitor, index) => (
                <li key={index} className="  bg-orange-100/40 p-4 my-2 flex">
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
          </div>
          <div className="p-5 bg-slate-600/30 rounded-lg">
            <h3>Cantidad de Memoria Ram : {data[0].memLayout.length ?? ''}</h3>
            <ul>
              {data[0].memLayout.map((Ram, index) => (
                <li key={index} className="  bg-orange-100/40 p-4 my-2 ">
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
          </div>
          <div className="p-5 bg-slate-600/30 rounded-lg">
            <h3 className="text-center text-xl py-2">bios</h3>
            <h3>release data : {data[0].bios.releaseDate ?? ''}</h3>
            <h3>Marca : {data[0].bios.vendor ?? ''}</h3>
            <h3>Version : {data[0].bios.version ?? ''}</h3>
          </div>
        </section>
        <div className="p-5 bg-slate-600/30 rounded-lg mt-5">
          <h1 className="text-center text-2xl">Discos Duros</h1>
          <h3>Discos Duros cantidad : {data[0].blockDevices.length}</h3>
          <ul className="w-full grid grid-cols-3 gap-5">
            {data[0].blockDevices.map((disk, index) => (
              <li key={index} className="my-2 bg-orange-100/20 p-4">
                <h3>nombre : {disk.name ?? ''}</h3>
                <h3>serial : {Math.round((disk.size / 1073741824) * 100) / 100 ?? ''} GB</h3>
                <h3>ifsTyped : {disk.fsType ?? ''}</h3>
                <h3> physical : {disk.physical ?? ''}</h3>
                <h3>id : {disk.uuid ?? ''}</h3>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default Home

async function sendSystemInfo(iDDispositivo, data) {
  if (!(iDDispositivo > 0)) {
    console.log('no existe ningún usuario')
    return
  }
  const { data: DataApi } = await AxiosRest.post('/Dispositivos/Agent', {
    ...data[0],
    IdDipositivo: iDDispositivo
  })
  toast.success(DataApi.message)

  console.log('Sí está listo')
}

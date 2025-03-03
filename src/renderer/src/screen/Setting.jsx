import { useEffect, useState } from 'react'
import { AxiosRest } from '../helpers/ApiConfig'
import { DataInformationPC } from '../store'
import { toast } from 'react-toastify'
import { useDataSystem } from '../store/Use-data-system'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UseAuthDevice } from '@/hoocks/UseRegister-Device'
import { CpuBrand, isVerifiyDevice } from '@/helpers/types-setting'

function Setting() {
  const { datainformation } = useDataSystem()
  const [DataToken, setDataToken] = useState(localStorage.getItem('TokenSucursal') ?? '')

  const { data, AddDispositivoId, iDDispositivo, CloseOpenAuth, TrueOpenAuth } = DataInformationPC()

  const Data_empresa = JSON.parse(localStorage.getItem('Data_Empresa') ?? null)

  // Auth import
  const { mutate: MutateAuth, isLoading: LoadingAuth } = UseAuthDevice()

  async function handleDatsBack() {
    if (!DataToken) {
      alert('No se ha seleccionado una sucursal')
      return
    }

    const { data: DataApi } = await AxiosRest.post('/device', {
      isRegisterAgent: true,
      name: datainformation.osInfo.hostname,
      status: 'En buen estado',
      nickName: '',
      branchId: DataToken,
      information: {
        type: isVerifiyDevice(datainformation.battery.hasBattery),
        typeDevice:
          isVerifiyDevice(datainformation.battery.hasBattery) === 'Pc' ? 'Compatible' : 'Netboock',
        serialNumber: datainformation.uuid.os,
        typeConection: '',
        brand: 'Compatible',
        model: 'Compatible'
      },
      os: {
        platform: datainformation.osInfo.platform ?? 'No disponible',
        distro: datainformation.osInfo.distro ?? 'No disponible',
        release: datainformation.osInfo.release ?? 'No disponible',
        architecture: datainformation.osInfo.arch ?? 'No disponible',
        kernel: datainformation.osInfo.kernel ?? 'No disponible',
        build: datainformation.osInfo.build ?? 'No disponible',
        serial: datainformation.osInfo.serial ?? 'No disponible',
        uefi: datainformation.osInfo.uefi ?? 'No disponible',
        fqdn: datainformation.osInfo.fqdn ?? 'No disponible'
      },
      motherboard: {
        brand: datainformation.baseboard.manufacturer ?? 'No disponible',
        model: datainformation.baseboard.model ?? 'No disponible',
        quantitySlots: datainformation.baseboard.memSlots ?? 0
      },
      cpu: {
        brand: CpuBrand(datainformation.cpu.brand),
        model: datainformation.cpu.brand,
        cores: datainformation.cpu.cores ?? 0,
        threads: datainformation.cpu.physicalCores ?? 0
      },
      gpu: datainformation.graphics.controllers?.map((item) => ({
        brand: CpuBrand(item.vendor),
        model: item.model,
        position: item.bus,
        vram: item.vram
      })),
      network: datainformation.networkInterfaces.map((item) => ({
        name: item.ifaceName,
        ip4: item.ip4,
        ip6: item.ip6,
        type: item.type ?? 'Uknown',
        speed: item.speed ?? 'Error',
        status: item.operstate ?? 'Error',
        isDhcp: Boolean(item.dhcp ?? false),
        isVirtual: Boolean(item.virtual ?? false)
      })),
      storage: datainformation.diskLayout.map((item) => ({
        brand: item.vendor ?? 'No disponible',
        model: item.name ?? 'No disponible',
        capacity: item.size,
        type: item.type
      })),
      ram: datainformation.memLayout.map((item) => ({
        brand: item.manufacturer ?? 'No disponible',
        model: item.partNum ?? 'No disponible',
        type: item.type ?? 'No disponible',
        capacity: item.size ?? 0,
        speed: item.clockSpeed
      }))
    })
    window.systemAPI.sendSignDevice({
      id_device: DataApi.id_device
    })

    localStorage.setItem('id_device', DataApi.id_device)
    return toast.info(DataApi.message)
  }
  function HandleDeleteToken() {
    CloseOpenAuth()
    localStorage.removeItem('TokenSucursal')
    localStorage.removeItem('id_device')
    localStorage.removeItem('Data_Empresa')
    AddDispositivoId(0)
    return alert('Token Borrado')
  }

  function removeIdDevice() {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas borrar la vinculación del dispositivo?'
    )
    if (!confirmed) return
    // Lógica para borrar la vinculación
    alert('La vinculación ha sido eliminada.')
    window.systemAPI.removeIdDevice()

    localStorage.removeItem('id_device')
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setDataToken(localStorage.getItem('id_device') || '')
    }

    // Suscribirse al evento de cambio en el localStorage
    window.addEventListener('storage', handleStorageChange)

    // Limpiar la suscripción al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <>
      <main className="mx-4">
        <header className="grid-cols-[300px_190px]  grid items-end">
          <div>
            <h3 className="font-semibold">Token de la Sucursal</h3>
            <Input
              readOnly={localStorage.getItem('TokenSucursal')}
              type="text"
              onChange={(e) => setDataToken(e.target.value)}
              value={datainformation.id_device ?? DataToken}
              className=" w-full mt-1 px-3 py-3 indent-1 rounded-md focus:outline-none text-sm"
              placeholder="Introducir el token"
            />
          </div>
        </header>
        <header>
          {localStorage.getItem('IdDispositivo') && (
            <header className="flex gap-2 mt-5">
              <div className="grid">
                <label className="text-sm">Id Dispositivo</label>
                <Input type="text" className=" w-[100px] text-sm" readOnly value={DataToken} />
              </div>
              <div className="grid">
                <label className="text-sm">Empresa</label>
                <Input type="text" className=" text-sm" readOnly value={Data_empresa?.Empresa} />
              </div>
              <div className="grid">
                <label className="text-sm">Sucursal</label>
                <Input type="text" className=" text-sm" readOnly value={Data_empresa?.Sucursal} />
              </div>
            </header>
          )}
        </header>
        {/* {iDDispositivo > 0 && (
          <>
            <header>Login Authddddd</header>
          </>
        )} */}

        <div>
          <Button
            variant=""
            disabled={Boolean(datainformation.id_device)}
            onClick={handleDatsBack}
            className="dark:bg-white  font-semibold mt-5 px-5 py-3 indent-1 rounded-md focus:outline-none text-sm"
          >
            Enviar data
          </Button>

          {datainformation.id_device && (
            <Button
              variant=""
              onClick={() => {
                window.systemAPI.refreshData()
              }}
              className="dark:bg-white ml-3  font-semibold mt-5 px-5 py-3 indent-1 rounded-md focus:outline-none text-sm"
            >
              Refrescar data
            </Button>
          )}
        </div>
        {datainformation.id_device && (
          <Button
            variant=""
            onClick={() => {
              removeIdDevice()
            }}
            className="dark:bg-white font-semibold mt-5 px-5 py-3 indent-1 rounded-md focus:outline-none text-sm"
          >
            Eliminar Vinculacion
          </Button>
        )}
      </main>
    </>
  )
}

export default Setting

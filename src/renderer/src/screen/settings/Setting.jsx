import UnlickDeviceModal from '@/componentes/UnlickDevice'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { CpuBrand, isVerifiyDevice } from '@/helpers/types-setting'
import { Link2Off, RefreshCcw, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AxiosRest } from '../../helpers/ApiConfig'
import { useDataSystem } from '../../store/Use-data-system'
import RecoveryDevice from './components/recovery-device'
import DeleteFileConfiguration from './components/delete-files-configuration'

function Setting() {
  const { datainformation } = useDataSystem()
  const [DataToken, setDataToken] = useState(localStorage.getItem('TokenSucursal') ?? '')
  const [detailsEliminate, setDetailsEliminate] = useState(false)
  const [dataDetailEliminate, setDataDetailEliminate] = useState({
    description: ''
  })
  const [software, setSoftware] = useState([])
  const [loading, setLoading] = useState(true)
  const [dataConfiguration, setDataConfiguration] = useState()

  const fetchSoftware = async () => {
    try {
      const data = await window.systemAPI.getSoftwareList()
      setSoftware(data)
    } catch (error) {
      console.error('Error fetching software list:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSoftware()
  }, [])

  useEffect(() => {
    window.systemAPI.getConfig().then((data) => {
      if (data) {
        setDataConfiguration(data)
      }
    })
  }, [])

  const handleChange = (key, value) => {
    const updatedConfig = { ...dataConfiguration, [key]: value }
    setDataConfiguration(updatedConfig)
    window.systemAPI.saveConfig(updatedConfig)
  }

  async function handleDatsBack() {
    if (!DataToken) {
      alert('No se ha seleccionado una sucursal')
      return
    }

    try {
      const { data: DataApi } = await AxiosRest.post('/device', {
        isRegisterAgent: true,
        name: datainformation.osInfo.hostname,
        status: dataConfiguration?.statusDeviceDefault,
        nickName: '',
        branchId: DataToken,
        information: {
          type: isVerifiyDevice(datainformation.battery.hasBattery),
          typeDevice:
            isVerifiyDevice(datainformation.battery.hasBattery) === 'Pc'
              ? 'Compatible'
              : 'Netboock',
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
        })),
        applications: software
          ?.filter((item) => item.InstallLocation !== undefined && item?.InstallLocation !== '')
          ?.map((item) => ({
            displayName: item?.DisplayName || 'No disponible',
            name: item?.DisplayName || 'No disponible',
            registryDirName: item?.RegistryDirName || 'No disponible',
            installLocation: item?.InstallLocation || 'No disponible',
            uninstallLocation: item?.UninstallString || 'No disponible',
            version: item?.DisplayVersion || '0.0.0',
            installDate: item?.InstallDate && !isNaN(new Date(item?.InstallDate).getTime()) 
              ? new Date(item?.InstallDate) 
              : new Date(),
            publisher: item?.Publisher || 'No disponible',
            helpLink: item?.HelpLink || 'No disponible',
            displayVersion: item?.DisplayVersion || 'No disponible',
          }))
      })

      window.systemAPI.sendSignDevice({
        id_device: DataApi.id_device
      })
      handleChange('id_device', DataApi.id_device)

      localStorage.setItem('id_device', DataApi.id_device)
      return toast.info(DataApi.message)
    } catch (error) {
      toast.error('Error al enviar los datos' + error?.message)
    }
  }

  function removeIdDevice() {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas borrar la vinculación del dispositivo?'
    )
    if (!confirmed) return

    setDetailsEliminate(true)
  }

  function handleUnlickDevice() {
    const detailsUnlick = {
      description: dataDetailEliminate.description,
      deviceId: dataConfiguration?.id_device,
      action: 'Desvincular Agente'
    }

    setDetailsEliminate(false)
    // Lógica para borrar la vinculación
    alert('La vinculación ha sido eliminada.')
    window.systemAPI.removeIdDevice()
    handleChange('id_device', null)
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
      <main className="">
        <Card className="">
          <CardHeader>
            <CardTitle>Configuracion de la Sucursal</CardTitle>
          </CardHeader>
          <CardContent>
            <main>
              <div>
                <Input
                  readOnly={dataConfiguration?.id_device}
                  type="text"
                  onChange={(e) => setDataToken(e.target.value)}
                  value={dataConfiguration?.id_device}
                  className=" w-full px-3 py-5 indent-1 rounded-md focus:outline-none text-sm"
                  placeholder="Introducir el token"
                />
              </div>
              <section className="flex py-4 gap-2">
                <div className="flex items-center space-x-2">
                  <Switch id="dataDevice" checked={true} disabled={true} />
                  <label htmlFor="dataDevice">Información dispositivo</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="dataAplications" />
                  <label htmlFor="dataAplications">Historial de Aplicaciones</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="changuesDevice" />
                  <label htmlFor="changuesDevice">Historial de cambio</label>
                </div>
              </section>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="default"
                  disabled={Boolean(dataConfiguration?.id_device)}
                  onClick={handleDatsBack}
                  className="  font-semibold  indent-1 rounded-md focus:outline-none text-sm flex items-center"
                >
                  <Send className="size-5" />
                  Enviar data
                </Button>

                {dataConfiguration?.id_device && (
                  <Button
                    variant=""
                    onClick={() => {
                      window.systemAPI.refreshData()
                    }}
                    className="dark:bg-white  font-semibold  indent-1 rounded-md focus:outline-none text-sm"
                  >
                    <RefreshCcw className="size-5" />
                    Refrescar data
                  </Button>
                )}
                {dataConfiguration?.id_device && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      removeIdDevice()
                    }}
                    className=" font-semibold  indent-1 rounded-md focus:outline-none text-sm"
                  >
                    <Link2Off className="size-5" /> Eliminar Vinculacion
                  </Button>
                )}
              </div>
            </main>
            <main className="mt-10 border-t pt-5 flex justify-between items-center">
              <h3>Estado de dispositivo (Defecto)</h3>
              <Input
                className="w-[200px]"
                value={dataConfiguration?.statusDeviceDefault}
                onChange={(e) => handleChange('statusDeviceDefault', String(e.target.value))}
                placeholder="Minutos"
              />
            </main>
            <DeleteFileConfiguration />
          </CardContent>
        </Card>
      </main>
      {!dataConfiguration?.id_device && (
        <RecoveryDevice
          dataConfiguration={dataConfiguration}
          setDataConfiguration={setDataConfiguration}
        />
      )}
      <UnlickDeviceModal
        open={detailsEliminate}
        setOpen={setDetailsEliminate}
        dataDetailEliminate={dataConfiguration}
        handleUnlickDevice={handleUnlickDevice}
        setDataDetailEliminate={setDataDetailEliminate}
      />
    </>
  )
}

export default Setting

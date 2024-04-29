import { useEffect, useState } from 'react'
import { AxiosRest } from '../helpers/ApiConfig'
import { DataInformationPC } from '../store'
import { toast } from 'react-toastify'
import { useDataSystem } from '../store/Use-data-system'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function Setting() {
  const { datainformation } = useDataSystem()
  const [DataToken, setDataToken] = useState(localStorage.getItem('TokenSucursal') ?? '')
  const { data, AddDispositivoId, iDDispositivo, CloseOpenAuth, TrueOpenAuth } = DataInformationPC()
  const Data_empresa = JSON.parse(localStorage.getItem('Data_Empresa'))

  useEffect(() => {
    const handleStorageChange = () => {
      setDataToken(localStorage.getItem('TokenSucursal') || '')
    }

    // Suscribirse al evento de cambio en el localStorage
    window.addEventListener('storage', handleStorageChange)

    // Limpiar la suscripción al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  function HandleStorageDevice({ data }) {
    window.electron.ipcRenderer.send('device-data', data)
  }

  async function handleSubmiting() {
    try {
      if (DataToken === '') {
        alert('Error el token no puede estar vacio')
        return toast.info('No se puede guardar un token vacio')
      }
      const { data } = await AxiosRest.post('/Dispositivos/Agent/Auth', {
        TokenSucursal: DataToken,
        IdDispositivo: localStorage.getItem('IdDispositivo') ?? null
      })

      if (data.auth === false) {
        return toast.error(data.message)
      }
      TrueOpenAuth()
      HandleStorageDevice({ data: data.Id })
      localStorage.setItem('IdDispositivo', data.Id)
      localStorage.setItem('TokenSucursal', DataToken)
      localStorage.setItem('Data_Empresa', JSON.stringify(data.Data_empresa))
      AddDispositivoId(data.Id)
      return toast.success(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function handleDatsBack() {
    const { data: DataApi } = await AxiosRest.post('/Dispositivos/Agent', {
      ...datainformation,
      IdDipositivo: localStorage.getItem('IdDispositivo')
    })
    return toast.info(DataApi.message)
  }
  function HandleDeleteToken() {
    CloseOpenAuth()
    localStorage.removeItem('TokenSucursal')
    localStorage.removeItem('IdDispositivo')
    localStorage.removeItem('Data_Empresa')
    AddDispositivoId(0)
    return alert('Token Borrado')
  }

  return (
    <>
      <main className="">
        <header className="grid-cols-[300px_190px] grid items-end">
          <div>
            <h3 className="font-semibold">Token de la Sucursal</h3>
            <Input
              readOnly={localStorage.getItem('TokenSucursal')}
              type="text"
              onChange={(e) => setDataToken(e.target.value)}
              value={DataToken}
              className=" w-full mt-1 px-3 py-3 indent-1 rounded-md focus:outline-none text-sm"
              placeholder="Introducir el token"
            />
          </div>
          {!localStorage.getItem('TokenSucursal') && (
            <Button
              disabled={localStorage.getItem('TokenSucursal')}
              onClick={handleSubmiting}
              className="bg-black py-3 text-sm px-4 ml-5 rounded-md font-semibold"
            >
              Guardar Token
            </Button>
          )}
          {localStorage.getItem('TokenSucursal') && (
            <Button
              disabled
              onClick={HandleDeleteToken}
              className="bg-black py-3 text-sm px-4 ml-5 rounded-md font-semibold"
            >
              Eliminar Token
            </Button>
          )}
        </header>
        <header>
          {localStorage.getItem('IdDispositivo') && (
            <header className="flex gap-2 mt-5">
              <div className="grid">
                <label className="text-sm">Id Dispositivo</label>
                <Input
                  type="text"
                  className=" w-[100px] text-sm"
                  readOnly
                  value={localStorage.getItem('IdDispositivo')}
                />
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

        <Button
          onClick={handleDatsBack}
          className="bg-black font-semibold mt-5 px-5 py-3 indent-1 rounded-md focus:outline-none text-sm"
        >
          Enviar data
        </Button>
      </main>
    </>
  )
}

export default Setting

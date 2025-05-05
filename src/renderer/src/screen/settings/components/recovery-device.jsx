import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { HandleChangeSetting, recoveryConection } from '../services/recovery-device-service'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export default function RecoveryDevice() {
  const [codeDeviceRecovery, setCodeDeviceRecovery] = useState('')
  const [changesDevice, setChangesDevice] = useState({})
  const { handleChange } = HandleChangeSetting()

  async function handleRecoveryConection() {
    if (codeDeviceRecovery.length < 4) {
      return toast.error('Digite de manera correcta el codigo de recuperacion del dispositivo')
    }
    const { changes, id_device } = await recoveryConection(codeDeviceRecovery, handleChange)
    console.log('changes', changes)
    if (changes) {
      setChangesDevice({
        ...changes,
        id_device: id_device
      })
    }
  }
  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Recuperar Conexión</CardTitle>
          <CardDescription>
            Si el dispositivo se ha desconectado, puedes intentar recuperarlo ingresando el código
            de dispositivo proporcionado por el usuario. Esto puede ayudar a restablecer la conexión
            y restaurar la funcionalidad del dispositivo. Asegúrate de que el usuario haya
            proporcionado el código correcto antes de intentar la recuperación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="">
            <span>Codigo Dispositivo </span>
            <Input
              placeholder="Ej: DEV123456"
              value={codeDeviceRecovery}
              onChange={(e) => {
                setCodeDeviceRecovery(e.target.value)
              }}
            />
            <Button
              type="button"
              onClick={handleRecoveryConection}
              className=" font-semibold mt-5 px-5 py-3 indent-1 rounded-md focus:outline-none text-sm"
            >
              Reconectar
            </Button>
          </div>
        </CardContent>
      </Card>
      {Object.keys(changesDevice).length > 0 && (
        <Dialog open>
          <DialogContent>
            Oh no! Parece que el dispositivo ha tenido algunos cambios. Aquí tienes un resumen de lo
            que ha cambiado:
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

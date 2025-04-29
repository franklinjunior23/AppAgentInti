import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { HandleChangeSetting, recoveryConection } from '../services/recovery-device-service'

export default function RecoveryDevice() {
  const [codeDeviceRecovery, setCodeDeviceRecovery] = useState('')
  const {handleChange} = HandleChangeSetting()

  function handleRecoveryConection() {
    if (codeDeviceRecovery.length < 4) {
      return toast.error('Digite de manera correcta el codigo de recuperacion del dispositivo')
    }
    recoveryConection(codeDeviceRecovery,handleChange)
  }
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Recuperar Conexión</CardTitle>
        <CardDescription>
          Si el dispositivo se ha desconectado, puedes intentar recuperarlo ingresando el código de
          dispositivo proporcionado por el usuario. Esto puede ayudar a restablecer la conexión y
          restaurar la funcionalidad del dispositivo. Asegúrate de que el usuario haya proporcionado
          el código correcto antes de intentar la recuperación.
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
  )
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import React, { createContext, useEffect, useState } from 'react'

const intitialState = {
  errorState: false,
  errorMessage: ''
}

const ErrorProviderContent = createContext(intitialState)

export default function ErrorProvider({ children }) {
  const [errorState, setErrorState] = useState(false)
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [errorMessage, setErrorMessage] = useState('hola')

  useEffect(() => {
    window.systemAPI.onErrorSystem((error) => {
      setErrorState(true)
      setStatus(error.success)
      setTitle(error?.title || 'Error en la acción')
      setErrorMessage(error.message)

      return () => {
        window.systemAPI.removeErrorSystemListener()
      }
    })
  }, [])

  return (
    <ErrorProviderContent.Provider>
      {children}

      <Dialog open={errorState} onOpenChange={() => setErrorState(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </ErrorProviderContent.Provider>
  )
}

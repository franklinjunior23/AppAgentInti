import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

export default function UnlickDeviceModal({
  open,
  setOpen,
  dataDetailEliminate,
  setDataDetailEliminate,
  handleUnlickDevice
}) {

  const textRef = React.useRef(null)

  React.useEffect(() => {
    if (open) {
      setDataDetailEliminate((prev) => ({
        ...prev,
        description: ''
      }))
      setTimeout(() => {
        textRef.current?.focus()
      }, 100)
    }
  }, [open, setDataDetailEliminate])
  


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent forceMount>
        <AlertDialogHeader>
          <AlertDialogTitle>Motivo de la eliminación</AlertDialogTitle>
          <AlertDialogDescription>
            Por favor, proporciona una breve descripción del motivo de la eliminación.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <section>
          <Textarea
            ref={textRef}
            autoFocus
            className="w-full rounded-lg p-2 h-[200px]"
            value={dataDetailEliminate?.description}
            onChange={(e) =>
              setDataDetailEliminate((prev) => ({
                ...prev,
                description: e.target.value
              }))
            }
          />
        </section>
        <AlertDialogFooter>
          <Button type="button" onClick={handleUnlickDevice}>
            Confirmar eliminación
          </Button>
          <AlertDialogCancel asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

import { Input } from '@/components/ui/input'
import ComingItem from '../componentes/ComingItem'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
function Support() {
  return (
    <>
      <main className="">
        <h1 className="font-semibold text-2xl my-3 ">Soporte Ticket</h1>
        <section className="grid">
          <label>Mencionar Titulo de su Problema</label>
          <Input placeholder={'Titulo del Problema'} />
        </section>
        <section>
          <label>Descripcion del problema</label>
          <Textarea className="w-full text-sm" rows="10"></Textarea>
        </section>
        <Button
          onClick={() => {
            toast.info('Proximamente se estara habilitando esta seccion ')
          }}
          className="bg-black  mt-5 rounded-md"
        >
          Crear Ticket
        </Button>
        <ComingItem />
      </main>
    </>
  )
}

export default Support

import ComingItem from '../componentes/ComingItem'
import Input from '../componentes/Input'
import { toast } from 'react-toastify'
function Support() {
  return (
    <>
      <main className="text-white">
        <h1 className="font-semibold text-2xl my-3 text-white">Soporte Ticket</h1>
        <section className="grid">
          <label>Mencionar Titulo de su Problema</label>
          <Input placeholder={'Titulo del Problema'} />
        </section>
        <section>
          <label>Descripcion del problema</label>
          <textarea
            className="w-full bg-black/50  mt-1 px-3 py-3 indent-1 rounded-md focus:outline-none text-sm"
            rows="10"
          ></textarea>
        </section>
        <button
          onClick={() => {
            toast.info('Proximamente se estara habilitando esta seccion ')
          }}
          className="bg-black py-2 px-6 rounded-md"
        >
          Crear Ticket
        </button>
        <ComingItem />
      </main>
    </>
  )
}

export default Support

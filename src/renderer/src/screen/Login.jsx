import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosRest, CONFIGDATAAPI } from '../helpers/ApiConfig'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { register, handleSubmit } = useForm()
  const navi = useNavigate()
  const [QuantityRepiit, setQuantityRepiit] = useState(0)
  const { mutate, isLoading } = useMutation({
    mutationFn: async (datos) => {
      const { data } = await AxiosRest.post('auth/login', datos)
      return data
    },
    onSuccess: (data) => {
      if (!data.loged) return setQuantityRepiit(QuantityRepiit + 1)
      localStorage.setItem(CONFIGDATAAPI.TOKEN_USER, data.token_user)
    },
    onError: (error) => {
      console.log(error)
    }
  })
  useEffect(() => {
    if (localStorage.getItem(CONFIGDATAAPI.TOKEN_USER)) return navi(-1, '/Dashboard')
  }, [navi, mutate])
  async function HandleSubmit(datos) {
    if (QuantityRepiit > 2) return alert('Muchos intentos, espere 5 minutos')

    await mutate(datos)
  }
  return (
    <main className="w-screen h-screen grid place-content-center">
      <article className=" ">
        <form onSubmit={handleSubmit(HandleSubmit)}>
          <div className="grid gap-3">
            <ComponentInput name={'usuario'} label={'User'} register={register} />
            <ComponentInput name={'contraseña'} label={'Contraseña'} register={register} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="  w-full bg-black/70 text-white py-2 rounded-lg"
            >
              {isLoading ? 'Charging...' : 'Sign In'}
            </button>
            <button
              type="button"
              className="  w-full bg-black/40 text-white py-2 rounded-lg"
              onClick={() => navi('/Dashboard')}
            >
              Next
            </button>
          </div>
        </form>
      </article>
    </main>
  )
}

export default Login

function ComponentInput({ name, register, label }) {
  return (
    <div>
      <label htmlFor={label} className="text-white">
        {label}
      </label>
      <input
        type="text"
        className="outline-none  rounded-lg px-3 py-2.5 w-full focus:outline-none bg-slate-500/20 border-none"
        {...register(name, {
          required: {
            value: true,
            message: `${label} is required`
          }
        })}
      />
    </div>
  )
}

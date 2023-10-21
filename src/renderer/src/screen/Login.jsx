import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'

function Login() {
  const { register, handleSubmit } = useForm()
  useEffect(() => {
    console.log('Login.jsx')
  }, [])
  function HandleSubmit(datos) {
    return console.log(datos)
  }
  return (
    <main className="w-screen h-screen grid place-content-center">
      <article className="bg-black/20 ">
        <h2 className="text-white">Sign In </h2>
        <form onSubmit={handleSubmit(HandleSubmit)}>
          <div className="grid gap-3">
            <ComponentInput name={'Usuario'} label={'User'} register={register} />
            <ComponentInput name={'Usuario'} label={'User'} register={register} />
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
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        className="outline-none border-2 rounded-lg px-3 py-2.5 w-full focus:outline-none"
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
ComponentInput.prototype = {
  name: PropTypes.string,
  register: PropTypes.func,
  label: PropTypes.string
}

import { data } from 'autoprefixer'
import { FileText } from 'lucide-react'
import React from 'react'

export default function PageChanges() {
  const [dataListChanges, setDataListChanges] = React.useState([])
  const [dataChangeFile, setDataChangeFile] = React.useState([])

  async function getListChangs() {
    const data = await window.systemAPI.getListChanges()
    if (data) {
      setDataListChanges(data)
    }
  }
  function handleViewChange(name) {
    window.systemAPI.readFileChanges(name).then((data) => {
      setDataChangeFile(data)
    })
  }

  const itemFields = dataChangeFile?.map((item) => {
    return Object.keys(item)
  })

  React.useEffect(() => {
    getListChangs()
  }, [])

  const fieldsView = {
    previous: 'anterior',
    current: 'actual'
  }
  function flattenObject(obj, prefix = '') {
    return Object.entries(obj || {}).reduce((acc, [key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value, path))
      } else {
        acc[path] = value
      }
      return acc
    }, {})
  }

  return (
    <div className="grid grid-cols-[230px_545px] overflow-hidden gap-4">
      <ul className='border-r'>
        {dataListChanges.map((item, index) => {
          return (
            <li
              key={index}
              className="  cursor-pointer "
              onClick={() => {
                handleViewChange(item)
              }}
            >
              <span className="flex gap-2  p-3 rounded-lg">
                <FileText className="size-5" /> {item}
              </span>
            </li>
          )
        })}
      </ul>
      <section className="h-[420px] overflow-y-auto">
        {dataChangeFile.length > 0 ? (
          <div>
            {dataChangeFile.map((item, index) => {
              return Object.keys(item).map((key) => {
                const componentData = item[key]
                const previous = flattenObject(componentData.previous)
                const current = flattenObject(componentData.current)

                const allKeys = Array.from(
                  new Set([...Object.keys(previous), ...Object.keys(current)])
                )

                return (
                  <div key={`${key}-${index}`} className="border p-4 my-4 rounded-lg">
                    <h2 className="font-bold mb-2 capitalize">{key}</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
                      <thead className="">
                        <tr>
                          <th className="border border-gray-300 p-2 text-left">Campo</th>
                          <th className="border border-gray-300 p-2 text-left">Anterior</th>
                          <th className="border border-gray-300 p-2 text-left">Actual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allKeys.map((field) => (
                          <tr key={field}>
                            <td className="border border-gray-300 p-2">{field}</td>
                            <td className="border border-gray-300 p-2">
                              {String(previous[field] ?? '—')}
                            </td>
                            <td className="border border-gray-300 p-2">
                              {String(current[field] ?? '—')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              })
            })}
          </div>
        ) : (
          <div className="h-full w-full grid place-content-center">
            <p className="text-center">
              No hay cambios para mostrar. Selecciona un archivo de la lista a la izquierda para ver
              los cambios realizados.
              <FileText className="size-10 mx-auto mt-4" />
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

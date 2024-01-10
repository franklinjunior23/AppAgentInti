function Update() {
  return (
    <div className="text-white">
      <h1 className="text-white font-extrabold text-2xl">Version 1.0.1</h1>
      <h3 className="font-medium mb-7">Notas de la Versión</h3>

      <span className="font-bold text-lg">Diciembre 20 de 2023</span>
      <ul className="list-disc ml-4 mt-2">
        <li className="mb-2">
          <span className="font-bold">Mejora en la interfaz del usuario:</span> Se ha logrado una
          interfaz más amigable.
        </li>
        <li className="mb-2">
          <span className="font-bold">Creación de secciones:</span>
          <ul className="list-disc ml-4">
            <li className="mb-1">
              <span className="font-bold">Actualización:</span> Visualiza las versiones del agente.
            </li>
            <li className="mb-1">
              <span className="font-bold">Ayuda:</span> Explora los diferentes contactos disponibles
              para buscar asistencia con la aplicación.
            </li>
            <li className="mb-1">
              <span className="font-bold">Soporte:</span> Próximamente, podrás crear tickets
              directamente en el agente.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Update

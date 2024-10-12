export function CpuBrand(brand) {
  // Convertir la cadena a minúsculas para realizar la búsqueda
  const lowerCaseBrand = brand.toLowerCase()

  // Verificar si contiene "intel"
  if (lowerCaseBrand.includes('intel')) {
    return 'Intel'
  }
  // Verificar si contiene "amd" o "rizen"
  else if (lowerCaseBrand.includes('amd') || lowerCaseBrand.includes('rizen')) {
    return 'AMD'
  }

  // Si no encuentra ninguna coincidencia
  return 'Unknown brand'
}

export function isVerifiyDevice(battery) {
  if (battery) return 'Laptop'

  return 'Pc'
}

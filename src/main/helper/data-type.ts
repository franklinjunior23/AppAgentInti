interface DataSystem {
  cpu: {
    brand: string
    model: string
    cores: number
    threads: number
    speed: number
    speedMax: number
    speedMin: number
  }
  ram: [
    {
      brand: string
      model: string
      type: string
      capacity: number
      speed: number
    }
  ]
  storage: [
    {
      brand: string
      model: string
      type: string
      capacity: number
      vendor : string
      serial : string
      firmwareRevision : string
      smartStatus : string
    }
  ]
  network: [
    {
      name: string
      mac: string
      ip4: string
      ip6: string
      type: string
      speed: number
      status: string
      isDhcp: boolean
      isVirtual: boolean
    }
  ]
  gpu: [
    {
      brand: string
      model: string
      vram: number
      position: string
    }
  ]
  motherboard: {
    brand: string
    model: string
    socket: string
    quantitySlots: number
    serial : string
    memoryMax: number
  }
  bios: {
    releaseDate: string
    vendor: string
    version: string
  }
}


interface Storage{
  fs : string
  type : string
  size : number
  used : number
  available : number
  use : number
  mounted : string
}
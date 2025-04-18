export interface DataDevice {
  baseboard: Baseboard;
  battery: Battery;
  bios: Bios;
  diskLayout: Disk[];
  memLayout: Memory[];
  graphics: Graphics;
  networkInterfaces: NetworkInterface[];
  uuid: UUID;
  osInfo: OSInfo;
  cpu: CPU;
  currentUser: string;
  storage: StorageDevice[];
}

export interface Baseboard {
  manufacturer: string;
  model: string;
  version: string;
  serial: string;
  assetTag: string;
  memMax: number;
  memSlots: number;
}

export interface Battery {
  hasBattery: boolean;
}

export interface Bios {
  vendor: string;
  version: string;
  releaseDate: string;
  revision: string;
  serial: string;
}

export interface Disk {
  device: string;
  type: string;
  name: string;
  vendor: string;
  size: number;
  bytesPerSector: number;
  totalCylinders: number;
  totalHeads: number;
  totalSectors: number;
  totalTracks: number;
  tracksPerCylinder: number;
  sectorsPerTrack: number;
  firmwareRevision: string;
  serialNum: string;
  interfaceType: string;
  smartStatus: string;
  temperature: number | null;
}

export interface Memory {
  size: number;
  bank: string;
  type: string;
  ecc: boolean;
  clockSpeed: number;
  formFactor: string;
  manufacturer: string;
  partNum: string;
  serialNum: string;
  voltageConfigured: number;
  voltageMin: number;
  voltageMax: number;
}

export interface Graphics {
  controllers: GPUController[];
  displays: Display[];
}

export interface GPUController {
  vendor: string;
  model: string;
  bus: string;
  vram: number;
  vramDynamic: boolean;
  subDeviceId: string;
}

export interface Display {
  vendor: string;
  model: string;
  deviceName: string;
  main: boolean;
  builtin: boolean;
  connection: string;
  resolutionX: number;
  resolutionY: number;
  sizeX: number;
  sizeY: number;
  pixelDepth: number;
  currentResX: number;
  currentResY: number;
  positionX: number;
  positionY: number;
  currentRefreshRate: number;
}

export interface NetworkInterface {
  iface: string;
  ifaceName: string;
  default: boolean;
  ip4: string;
  ip4subnet: string;
  ip6: string;
  ip6subnet: string;
  mac: string;
  internal: boolean;
  virtual: boolean;
  operstate: string;
  type: string;
  duplex: string;
  mtu: string;
  speed: number | null;
  dhcp: boolean;
  dnsSuffix: string;
  ieee8021xAuth: string;
  ieee8021xState: string;
  carrierChanges: number;
}

export interface UUID {
  os: string;
  hardware: string;
  macs: string[];
}

export interface OSInfo {
  platform: string;
  distro: string;
  release: string;
  codename: string;
  kernel: string;
  arch: string;
  hostname: string;
  fqdn: string;
  codepage: string;
  logofile: string;
  serial: string;
  build: string;
  servicepack: string;
  uefi: boolean;
  hypervisor: boolean;
  remoteSession: boolean;
}

export interface CPU {
  manufacturer: string;
  brand: string;
  vendor: string;
  family: string;
  model: string;
  stepping: string;
  revision: string;
  voltage: string;
  speed: number;
  speedMin: number;
  speedMax: number;
  governor: string;
  cores: number;
  physicalCores: number;
  performanceCores: number;
  efficiencyCores: number;
  processors: number;
  socket: string;
  flags: string;
  virtualization: boolean;
  cache: Cache;
}

export interface Cache {
  l1d: number;
  l1i: number;
  l2: number;
  l3: number;
}

export interface StorageDevice {
  fs: string;
  type: string;
  size: number;
  used: number;
  available: number;
  use: number;
  mount: string;
  rw: boolean;
}


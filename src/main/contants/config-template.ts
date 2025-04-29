interface ConfigurationUser {
  id_device: string | null
  heartbeatIntervalMinutes: number
  statusDeviceDefault: string
  updatedHeartbeat: Date | null
  updatedChangesAt: Date | null
}

const templateConfigurationUser: ConfigurationUser = {
  id_device: null,
  heartbeatIntervalMinutes: 5,
  statusDeviceDefault: 'Disponible',
  updatedHeartbeat: null,
  updatedChangesAt: null
}


export { templateConfigurationUser, ConfigurationUser }

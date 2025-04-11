interface ConfigurationUser {
  id_device: string | null
  heartbeatIntervalMinutes: number
  statusDeviceDefault: string
}

const templateConfigurationUser: ConfigurationUser = {
  id_device: null,
  heartbeatIntervalMinutes: 5,
  statusDeviceDefault: 'En Buen Estado'
}

export { templateConfigurationUser, ConfigurationUser }

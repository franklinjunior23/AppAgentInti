import { CpuInfo, cpuRepository } from '../database/query/cpu-query'
import si from 'systeminformation'

const dataQueryParser = {
  cpu: {
    manufacturer: {
      key: 'model',
      type: 'string'
    },
    brand: {
      key: 'brand',
      type: 'string'
    },
    cores: {
      key: 'cores',
      type: 'number'
    },
    performanceCores: {
      key: 'threads',
      type: 'number'
    },
    speed: {
      key: 'speed',
      type: 'number'
    },
    speedMax: {
      key: 'speed_max',
      type: 'number'
    },
    speedMin: {
      key: 'speed_min',
      type: 'number'
    },
    virtualization: {
      key: 'virtualization',
      type: 'boolean'
    }
  }
}

export async function ValidateCpu() {
  const exisCpu = await cpuRepository.existCpu()

  if (exisCpu === 0) {
    const cpuInfo = await si.cpu()

    const mappedCpuInfo: CpuInfo = Object.entries(dataQueryParser.cpu).reduce((acc, [key, field]) => {
      acc[field.key] = cpuInfo[key as keyof typeof cpuInfo] ?? null
      return acc
    }, {} as CpuInfo)

    await cpuRepository.inserCpuInfo(mappedCpuInfo)

    return mappedCpuInfo
  } else {
    const cpuInfo = await cpuRepository.getCpuInfo()
    return {
      manufacturer: cpuInfo?.model,
      brand: cpuInfo?.brand,
      cores: cpuInfo?.cores,
      performanceCores: cpuInfo?.threads,
      speed: cpuInfo?.speed,
      speedMax: cpuInfo?.speed_max,
      speedMin: cpuInfo?.speed_min,
      virtualization: cpuInfo?.virtualization
    }
  }
}


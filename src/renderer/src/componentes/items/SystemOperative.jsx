import { useDataSystem } from '@/store/Use-data-system'
import { TypesOs } from '@/helpers/TypesOs'
import { LabelItem } from './SectionLayaout'

function SystemOperative() {
  const { datainformation } = useDataSystem()
  return (
    <>
      <div className="w-[57%] ">
        <TypesOs platform={datainformation.osInfo.platform} />
        <h3 className="text-xl capitalize font-bold ">
          {datainformation.osInfo.platform ?? 'Hubo un error'}
        </h3>
        <main className="mt-4  ">
          <LabelItem
            label={'Distro'}
            dataLabel={datainformation.osInfo.distro ?? 'Hubo un error distro'}
          />
          <LabelItem
            label={'Arquitectura'}
            dataLabel={datainformation.osInfo.arch ?? 'Hubo un error arch'}
          />
          <LabelItem
            label={'Version'}
            dataLabel={datainformation.osInfo.release ?? 'Hubo un error release'}
          />
          <LabelItem
            label={'Kernel'}
            dataLabel={datainformation.osInfo.kernel ?? 'Hubo un error kernel'}
          />
          <LabelItem
            label={'Serial'}
            dataLabel={datainformation.osInfo.serial ?? 'Hubo un error serial'}
          />
        </main>
      </div>
    </>
  )
}

export default SystemOperative

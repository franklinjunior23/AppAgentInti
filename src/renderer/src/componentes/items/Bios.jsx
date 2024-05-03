import { LabelItem } from './SectionLayaout'
import { useDataSystem } from '@/store/Use-data-system'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

function Bios() {
  const { datainformation } = useDataSystem()
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold mb-2">Bios</h2>
      </CardHeader>
      <CardContent className="w-full">
        <LabelItem label={'Fabricante'} dataLabel={datainformation.bios.vendor} />
        <LabelItem label={'Release Date'} dataLabel={datainformation.bios.releaseDate} />
        <LabelItem label={'Version'} dataLabel={datainformation.bios.version} />
      </CardContent>
    </Card>
  )
}

export default Bios

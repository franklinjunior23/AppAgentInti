import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from '@radix-ui/react-icons'

function ComingItem() {
  return (
    <Alert className="mt-5">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Proximamente!</AlertTitle>
      <AlertDescription>Proximamente se estara habilitando ello..... </AlertDescription>
    </Alert>
  )
}

export default ComingItem

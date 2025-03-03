import React from 'react'
import useLocalStorage from '@/hoocks/localstorage-get'
import { GetConnectedUser } from './user.service'
import { Skeleton } from '@/components/ui/skeleton'
import { IconUser } from '@tabler/icons-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function UserView() {
  const deviceId = useLocalStorage('id_device')
  const getUser = GetConnectedUser(deviceId)

  if (!deviceId)
    return (
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Usuario Vinculado</CardTitle>
          </CardHeader>
          <CardContent>
            <section className="flex items-center justify-center gap-2">
              <IconUser />
              <span>No hay usuario vinculado</span>
            </section>
          </CardContent>
        </Card>
      </section>
    )

  const { data, isLoading } = getUser

  if (isLoading)
    return (
      <section>
        <Skeleton />
      </section>
    )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuario Vinculado</CardTitle>
      </CardHeader>
      <CardContent>
        <section className="flex items-center justify-center gap-2">
          <IconUser />
          <span>{data?.user ? data?.user?.name : 'No hay usuario vinculado'}</span>
        </section>
      </CardContent>
    </Card>
  )
}

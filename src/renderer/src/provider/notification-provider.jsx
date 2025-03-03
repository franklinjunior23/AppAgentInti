import React, {  useEffect, useState, createContext } from 'react'


const GET_NOTIFICATION = 'get-notification'
const GET_NOTIFICATION_REPLY = 'get-notifications-reply'

const NotificationContext = createContext()

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Escuchar la respuesta de Electron
    window.systemAPI.onNotificationsReply((response) => {
      if (response.error) {
        console.error('Error obteniendo notificaciones:', response.error)
      } else {
        setNotifications(response.data)
      }
    })

    // Pedir notificaciones
    window.systemAPI.getNotifications({ limit: 20, offset: 0 })

    // Escuchar notificaciones en tiempo real
    window.systemAPI.onNewNotification((notification) => {
      setNotifications((prev) => [notification, ...prev])
    })

    // Limpiar eventos al desmontar
    return () => window.systemAPI.removeListenersNotifications()
  }, [])

  console.log(notifications)

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  )
}



import { IpcMainEvent } from 'electron'

interface SendError {
  success: boolean
  message: string
  title: string
}

const SYSTEM_ERROR = 'errorSystem'

export function sendSystemError(event: IpcMainEvent, error: SendError) {
  return event.sender.send(SYSTEM_ERROR, {
    success: error.success,
    message: `${error.message}`,
    title: error.title
  })
}

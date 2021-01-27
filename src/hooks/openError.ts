import type { ServiceError } from '@tmtsoftware/esw-ts'
import message from 'antd/lib/message'

export const openError = (error: ServiceError | Error) => {
  message.error({
    content: error.message,
    duration: 3
  })
}

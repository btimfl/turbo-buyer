import toast from 'react-hot-toast'

class NotificationHandler {
  error(message?: string) {
    toast.error(message || 'An error occurred!')
  }
}

export default new NotificationHandler()

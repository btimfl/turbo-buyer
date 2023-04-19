export const baseURL = '/a/u'

export default async function gateway(key: string): Promise<any> {
  return new Promise((res, rej) => {
    function messageHandler(message: MessageEvent) {
      if (
        message.data?.type === 'TURBO_CALLBACK' &&
        message.data?.key === key
      ) {
        res(message.data?.apiResponse)
      }
    }

    window.addEventListener('message', messageHandler, { once: true })
  })

  return new Promise((res, rej) => {
    window.addEventListener('message', (message) => {
      if (
        message.data?.type === 'TURBO_CALLBACK' &&
        message.data?.key === key
      ) {
        res(message.data?.apiResponse)
      }
    })
  })
}

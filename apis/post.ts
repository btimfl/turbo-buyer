import { baseURL } from './gateway'

export function sendOTP(phone: string): Promise<any> {
  const apiInfo = {
    path: `${baseURL}/v1/shopify-app/auth/otp?mobile=${phone}`,
    data: {
      method: 'POST',
    },
  }

  window?.top?.postMessage(
    { type: 'TURBO_CALL', apiInfo, key: 'SEND_OTP' },
    '*'
  )

  return new Promise((res, rej) => {
    window.addEventListener('message', (message) => {
      if (
        message.data?.type === 'TURBO_CALLBACK' &&
        message.data?.key === 'SEND_OTP'
      ) {
        res(message.data?.apiResponse)
      }
    })
  })
}

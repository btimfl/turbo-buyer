import { baseURL } from './gateway'

export function sendOTP(phone: string) {
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
}

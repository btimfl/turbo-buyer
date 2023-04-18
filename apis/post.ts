import gateway, { baseURL } from './gateway'

export function sendOTP(phone: string): Promise<any> {
  const KEY = 'SEND_OTP'

  const apiInfo = {
    path: `${baseURL}/auth/v1/otp?mobile=${phone}`,
    data: {
      method: 'POST',
    },
  }

  window?.top?.postMessage(
    { type: 'TURBO_CALL', apiInfo, key: 'SEND_OTP' },
    '*'
  )

  return gateway(KEY)
}

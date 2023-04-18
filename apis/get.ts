import gateway, { baseURL } from './gateway'

export function fetchAddressWithOtp(
  otp: string,
  otp_request_id: string,
  mobile: string
): Promise<any> {
  const KEY = 'FETCH_ADDRESS'

  const apiInfo = {
    path: `${baseURL}/v1/shopify-turbo-addresses?otp=${otp}&otp_request_id=${otp_request_id}&mobile=${mobile}`,
    data: {
      method: 'GET',
    },
  }

  window?.top?.postMessage(
    { type: 'TURBO_CALL', apiInfo, key: 'FETCH_ADDRESS' },
    '*'
  )

  return gateway(KEY)
}

export function getTurboAddressCount(phone: string): Promise<any> {
  const KEY = 'FETCH_TAC'

  const apiInfo = {
    path: `${baseURL}/v1/shopify-store-addresses?mobile=${phone}`,
    data: {
      method: 'GET',
    },
  }

  window?.top?.postMessage(
    { type: 'TURBO_CALL', apiInfo, key: 'FETCH_TAC' },
    '*'
  )

  return gateway(KEY)
}

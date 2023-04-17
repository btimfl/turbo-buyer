import { baseURL } from './gateway'

export function fetchAddressWithOtp(
  otp: string,
  otp_request_id: string,
  mobile: string
): Promise<Response> {
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

  return new Promise((res, rej) => {
    window.addEventListener('message', (message) => {
      if (
        message.data?.type === 'TURBO_CALLBACK' &&
        message.data?.key === 'FETCH_ADDRESS'
      ) {
        res(message.data?.response)
      }
    })
  })
}

export function getTurboAddressCount(phone: string): Promise<Response> {
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

  return new Promise((res, rej) => {
    window.addEventListener('message', (message) => {
      if (
        message.data?.type === 'TURBO_CALLBACK' &&
        message.data?.key === 'FETCH_TAC'
      ) {
        res(message.data?.response)
      }
    })
  })
}

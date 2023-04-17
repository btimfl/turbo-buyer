import gateway from './gateway'

const baseUrl = 'https://unifill.unicommerce.co.in/vas'
// const baseUrl = 'http://localhost:8080'
// const baseUrl = 'https://unifill.unicommerce.co.in'
// const baseUrl = '/apps/unifill'

export async function fetchAddressWithOtp(
  otp: string,
  otp_request_id: string,
  mobile: string
): Promise<Response> {
  const res = await gateway(
    `${baseUrl}/v1/addresses?otp=${otp}&otp_request_id=${otp_request_id}&mobile=${mobile}`,
    'GET'
  )
  return res
}

export async function getTurboAddressCount(phone: string): Promise<Response> {
  const res = await gateway(
    `http://localhost:4001/turbo/count?mobile=${phone}`,
    'GET'
  )
  return res
}

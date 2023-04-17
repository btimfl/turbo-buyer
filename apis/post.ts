import gateway from './gateway'

// const baseUrl = 'https://unifill.unicommerce.co.in/vas'
// const baseUrl = 'http://localhost:8080';
const baseUrl = 'https://unifill.unicommerce.co.in'
// const baseUrl = '/apps/unifill';

export async function sendOTP(phone: string): Promise<Response> {
  const res = await gateway(
    `${baseUrl}/vas/auth/v1/otp?mobile=${phone}`,
    `POST`
  )
  return res
}

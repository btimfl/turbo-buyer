export function getHeaders(method: string): Headers {
  const headers = new Headers()
  headers.append('Content-type', 'application/json')

  if (method === 'POST') {
    headers.append('x-api-key', 'ugaoo_with_otp-m6mmd4md8xjs3jo5oah5')
  } else {
    //uc_sales-wXDbwosW6tsi2SuLM3AI
    headers.append('X-API-KEY', 'ugaoo_with_otp-m6mmd4md8xjs3jo5oah5')
  }
  return headers
}

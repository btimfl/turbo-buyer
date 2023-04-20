export function getHeaders(method: string): Headers {
  const headers = new Headers()
  headers.append('Content-type', 'application/json')

  if (method === 'POST') {
    headers.append('x-api-key', 'test1-1234')
  } else {
    //uc_sales-wXDbwosW6tsi2SuLM3AI
    headers.append('X-API-KEY', 'test1-1234')
  }
  return headers
}

import { getHeaders } from '../utils/configurations/headers'

export const baseURL = '/a/u'

export default async function gateway(
  path: string,
  method: string = 'GET',
  payload?: any
) {
  return fetch(path, {
    method,
    headers: getHeaders(method),
    body: method === 'GET' ? null : payload,
  })
}

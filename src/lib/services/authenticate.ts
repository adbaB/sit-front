import { BACKEND_URL } from '../config/api'
import { Autenticate, LoginError, LoginResponse } from '../models/authenticate'
import axios, { AxiosError } from 'axios'
export async function authenticate(
  data: Autenticate,
): Promise<LoginResponse | LoginError | undefined> {
  const options = {
    method: 'POST',
    url: `${BACKEND_URL}/auth/login`,
    headers: { 'Content-Type': 'application/json' },
    data,
  }

  try {
    const response = await axios.post(options.url, options.data, {
      headers: options.headers,
      withCredentials: true,
    })

    return response.data as LoginResponse
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return {
          status: error.response.status,
          message: error.response.data.message,
        } as LoginError
      }
      throw new Error(error.message)
    }
  }
}

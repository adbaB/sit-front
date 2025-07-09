export interface Autenticate {
  username: string
  password: string
}

export interface LoginResponse {
  status: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
    permissions: number[]
  }
}

export interface LoginError {
  status: number
  message: string
}

export interface PayloadJWT {
  id: number
  username: string
  name: string
  permissions: number[]
  iat: number
  exp: number
}

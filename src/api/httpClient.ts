import axios, { type AxiosInstance } from 'axios'
import { API_BASE_URL } from '../constants/api'

const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/vnd.api+json',
  },
})

// Intercept error response
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.errors?.[0]?.detail
    // || `HTTP ${error.response?.status}: ${error.response?.statusText}`
    return Promise.reject(new Error(message))
  }
)

export { httpClient }

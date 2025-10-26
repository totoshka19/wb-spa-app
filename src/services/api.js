import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    key: import.meta.env.VITE_API_KEY,
  }
  return config
})

export default apiClient

export const fetchData = (endpoint, params) => {
  return apiClient.get(`/${endpoint}`, { params })
}

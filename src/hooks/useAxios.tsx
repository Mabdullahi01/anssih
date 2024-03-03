import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const useAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true
})

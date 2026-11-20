import { homeMock, siteMock } from '@/data/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const BASE = import.meta.env.VITE_API_BASE_URL
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

async function request(path, mock) {
  if (USE_MOCK) {
    await delay(400) // simulate network latency
    return structuredClone(mock)
  }
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const getSiteConfig = () => request('/site', siteMock)
export const getHomeData = () => request('/home', homeMock)
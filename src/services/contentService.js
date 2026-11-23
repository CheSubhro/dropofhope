import { homeMock, siteMock, donorPageMock, campPageMock } from '@/data/mockData'

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

export const getDonorPageData = () => request('/donor-page', donorPageMock)

export async function submitDonorRegistration(data) {
  if (USE_MOCK) {
    await delay(2000) 
    return { success: true, donorId: 'DOH-' + Math.floor(100000 + Math.random() * 900000) }
  }
  const res = await fetch(`${BASE}/donors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json() 
}

export const getCampPageData = () => request('/camp-page', campPageMock)

export async function submitCampRegistration(data) {
  if (USE_MOCK) {
    await delay(2000)
    return { success: true, applicationId: 'CAMP-' + Math.floor(100000 + Math.random() * 900000) }
  }
  const res = await fetch(`${BASE}/camps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json() 
}
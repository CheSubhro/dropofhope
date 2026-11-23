import { homeMock, siteMock, 
  donorPageMock, campPageMock,
  aboutPageMock,blogPageMock,
  galleryPageMock, donatePageMock,
  requestPageMock,memberPageMock,
  doctorPageMock,certificatePageMock,
  organizePageMock      } from '@/data/mockData'

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

export const getAboutPageData = () =>
  request('/about-page', aboutPageMock)


export const getBlogPosts = () => request('/blog', blogPageMock)

export const getBlogPost = async (slug) => {
  const data = await getBlogPosts()
  return data.posts.find((post) => post.slug === slug) || null
}

export const getGalleryData = () => request('/gallery', galleryPageMock)

export const getDonatePageData = () =>
  request('/donate', donatePageMock)

export const submitDonationConfirmation = (payload) =>
  request('/donation-confirmations', {
    success: true,
    message:
      'Thank you for sharing your donation details. Our team will verify your transaction and contact you.',
    submittedData: payload,
  })

// Get request page data
export async function getRequestPageData() {
  return request('/request-blood', requestPageMock)
}

// Submit blood request

export async function submitBloodRequest(payload) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const requestRecord = {
    ...payload,
    id: `REQ-${Date.now().toString().slice(-6)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  return {
    success: true,
    request: requestRecord,
  }
}

export const getMemberPageData = () => {
  return request('/join-member', memberPageMock)
}

export async function submitMemberApplication(payload) {
  await new Promise((resolve) => setTimeout(resolve, 700))

  const application = {
    ...payload,
    id: `MEM-${Date.now().toString().slice(-6)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  return {
    success: true,
    application,
  }
}

export async function getDoctorPageData() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return doctorPageMock
}

export async function submitDoctorApplication(payload) {
  await new Promise((resolve) => setTimeout(resolve, 700))

  const application = {
    ...payload,
    id: `DOC-${Date.now().toString().slice(-6)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  return {
    success: true,
    application,
  }
}

export async function getCertificatePageData() {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return certificatePageMock
}

export async function findCertificates({ method, donorId, mobile, dob }) {
  await new Promise((resolve) => setTimeout(resolve, 700))

  const normalizedMobile = String(mobile || '').replace(/\D/g, '')

  let records = []

  if (method === 'donorId') {
    records = certificatePageMock.donations.filter(
      (item) =>
        item.donorId.toLowerCase() === String(donorId || '').trim().toLowerCase() &&
        item.mobile === normalizedMobile,
    )
  }

  if (method === 'mobile') {
    records = certificatePageMock.donations.filter(
      (item) => item.mobile === normalizedMobile && item.dob === dob,
    )
  }

  return records
}

export async function verifyCertificate(certificateId) {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const record = certificatePageMock.donations.find(
    (item) =>
      item.certificateId.toLowerCase() ===
      String(certificateId || '').trim().toLowerCase(),
  )

  if (!record) {
    return { valid: false, certificate: null }
  }

  const nameParts = record.donorName.trim().split(/\s+/)
  const firstName = nameParts[0] || ''
  const maskedName =
    firstName.charAt(0) +
    '*'.repeat(Math.max(firstName.length - 1, 1)) +
    (nameParts.length > 1 ? ` ${nameParts[nameParts.length - 1].charAt(0)}.` : '')

  return {
    valid: true,
    certificate: {
      certificateId: record.certificateId,
      donorName: maskedName,
      donationDate: record.donationDate,
      bloodGroup: record.bloodGroup,
    },
  }
}

export async function getOrganizePageData() {
  await new Promise((resolve) => setTimeout(resolve, 250))
  return organizePageMock
}

 


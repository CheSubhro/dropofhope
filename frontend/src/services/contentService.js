
import {
  homeMock,
  siteMock,
  donorPageMock,
  campPageMock,
  aboutPageMock,
  blogPageMock,
  galleryPageMock,
  donatePageMock,
  requestPageMock,
  memberPageMock,
  doctorPageMock,
  certificatePageMock,
  organizePageMock,
  privacyPageMock,
  termsPageMock,
} from '@/data/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

const LIVE_ENDPOINTS = (
  import.meta.env.VITE_LIVE_ENDPOINTS || ''
)
  .split(',')
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean)

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function shouldUseMock(endpoint) {
  if (!USE_MOCK) return false

  return !LIVE_ENDPOINTS.includes(endpoint.toLowerCase())
}

async function parseResponse(res) {
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const error = new Error(
      data.message || `Request failed: ${res.status}`,
    )

    error.status = res.status
    error.errors = Array.isArray(data.errors) ? data.errors : []

    throw error
  }

  return data
}

async function request(path, mock, endpoint) {
  if (shouldUseMock(endpoint)) {
    await delay(400)
    return structuredClone(mock)
  }

  if (!BASE) {
    throw new Error('API base URL is not configured.')
  }

  const res = await fetch(`${BASE}${path}`)
  return parseResponse(res)
}

async function postRequest(path, data, endpoint, mockResponse, mockDelay = 2000) {
  if (shouldUseMock(endpoint)) {
    await delay(mockDelay)
    return structuredClone(mockResponse)
  }

  if (!BASE) {
    throw new Error('API base URL is not configured.')
  }

  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return parseResponse(res)
}

export const getSiteConfig = () =>
  request('/site', siteMock, 'site')

export const getHomeData = () =>
  request('/home', homeMock, 'home')

export const getDonorPageData = () =>
  request('/donor-page', donorPageMock, 'donor-page')

export async function submitDonorRegistration(data) {
  const mockResponse = {
    success: true,
    donorId: `DOH-${Math.floor(100000 + Math.random() * 900000)}`,
  }

  return postRequest(
    '/donors',
    data,
    'donors',
    mockResponse,
  )
}

export const getCampPageData = () =>
  request('/camp-page', campPageMock, 'camp-page')

export async function submitCampRegistration(data) {
  const mockResponse = {
    success: true,
    applicationId: `CAMP-${Math.floor(100000 + Math.random() * 900000)}`,
  }

  return postRequest(
    '/camps',
    data,
    'camps',
    mockResponse,
  )
}

export const getAboutPageData = () =>
  request('/about-page', aboutPageMock, 'about-page')

export const getBlogPosts = () =>
  request('/blog', blogPageMock, 'blog')

export const getBlogPost = async (slug) => {
  const data = await getBlogPosts()
  return data.posts.find((post) => post.slug === slug) || null
}

export const getGalleryData = () =>
  request('/gallery', galleryPageMock, 'gallery')

export const getDonatePageData = () =>
  request('/donate', donatePageMock, 'donate')

export const submitDonationConfirmation = (payload) =>
  postRequest(
    '/donation-confirmations',
    payload,
    'donations',
    {
      success: true,
      message:
        'Thank you for sharing your donation details. Our team will verify your transaction and contact you.',
      submittedData: payload,
    },
  )

export async function getRequestPageData() {
  return request('/request-blood', requestPageMock, 'request-blood')
}

export async function submitBloodRequest(payload) {
  await delay(500)

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

export const getMemberPageData = () =>
  request('/join-member', memberPageMock, 'join-member')


export async function submitMemberApplication(payload) {
  const mockResponse = {
    success: true,
    application: {
      id: `MEM-${Date.now().toString().slice(-6)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  }

  return postRequest(
    '/members',
    payload,
    'members',
    mockResponse,
  )
}


export async function getDoctorPageData() {
  await delay(300)
  return doctorPageMock
}

export async function submitDoctorApplication(payload) {
  const mockResponse = {
    success: true,
    application: {
      ...payload,
      id: `DOC-${Date.now().toString().slice(-6)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  }

  return postRequest(
    '/doctors',
    payload,
    'doctors',
    mockResponse,
  )
}

export async function getCertificatePageData() {
  await delay(200)
  return certificatePageMock
}

export async function findCertificates({ method, donorId, mobile, dob }) {
  await delay(700)

  const normalizedMobile = String(mobile || '').replace(/\D/g, '')

  let records = []

  if (method === 'donorId') {
    records = certificatePageMock.donations.filter(
      (item) =>
        item.donorId.toLowerCase() ===
          String(donorId || '').trim().toLowerCase() &&
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
  await delay(400)

  const record = certificatePageMock.donations.find(
    (item) =>
      item.certificateId.toLowerCase() ===
      String(certificateId || '').trim().toLowerCase(),
  )

  if (!record) {
    return {
      valid: false,
      certificate: null,
    }
  }

  const nameParts = record.donorName.trim().split(/\s+/)
  const firstName = nameParts[0] || ''

  const maskedName =
    firstName.charAt(0) +
    '*'.repeat(Math.max(firstName.length - 1, 1)) +
    (nameParts.length > 1
      ? ` ${nameParts[nameParts.length - 1].charAt(0)}.`
      : '')

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
  await delay(250)
  return organizePageMock
}

export async function getPrivacyPageData() {
  await delay(250)
  return privacyPageMock
}

export async function getTermsPageData() {
  await delay(250)
  return termsPageMock
}

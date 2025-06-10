import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import React from 'react'

// Create a reusable axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.baseUrl}/auth/v1`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

type APIOptions = AxiosRequestConfig & {
  showToaster?: boolean
  params?: Record<string, any>
  body?: Record<string, any>
}

// this function replaces each ${cookieName} with the actual cookie value (in order to avoid accessing cookies on each request)
const optimizeUrl = (url: string): string =>
  url.replace(/\$([\w.-]+)/g, (_, name) =>
    encodeURIComponent(Cookies.get(name) || '')
  )

export const api = async function (
  url: string,
  options: APIOptions = { showToaster: true }
) {
  try {
    // Add token manually
    const token = Cookies.get('halakat.teacher-access-token')

    const res = await axiosInstance.request({
      url: optimizeUrl(url),
      method: options.method || 'GET',
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : ''
      },
      params: options.params, // Axios handles URLSearchParams internally
      data: options.body, // Axios uses `data` instead of `body`
      ...options
    })

    return res?.data
  } catch (err: any) {
    const status = err?.response?.status
    const message = err?.response?.data?.message || 'Something went wrong'

    if (status === 401 && window?.location?.pathname !== '/login') {
      // clear credentials
      Cookies.remove('halakat.teacher-access-token')

      // redirect to login page
      window.location.replace('/login')
    }

    throw err
  }
}

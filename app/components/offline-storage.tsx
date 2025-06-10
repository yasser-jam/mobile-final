"use client"

import { useEffect } from "react"

interface OfflineStorageProps {
  data: any
  key: string
}

export default function OfflineStorage({ data, key }: OfflineStorageProps) {
  useEffect(() => {
    // Save data to localStorage whenever it changes
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error("Failed to save to localStorage:", error)
    }
  }, [data, key])

  useEffect(() => {
    // Register for background sync if supported
    if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        return registration.sync.register("background-sync")
      })
    }
  }, [])

  return null
}

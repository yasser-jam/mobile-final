"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

export default function PWAInstaller() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [isIOSDevice, setIsIOSDevice] = useState(false)
  const [isPWAInstalled, setIsPWAInstalled] = useState(false)

  useEffect(() => {
    // Check if running as standalone PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsPWAInstalled(true)
      return
    }

    // Check if iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOSDevice(isIOS)

    // Listen for beforeinstallprompt event (Chrome, Edge, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
      setShowInstallBanner(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Check if already installed via localStorage
    const alreadyInstalled = localStorage.getItem("pwa-installed") === "true"
    const installDismissed = localStorage.getItem("pwa-install-dismissed") === "true"

    if (alreadyInstalled) {
      setIsPWAInstalled(true)
    } else if (!installDismissed) {
      // Show iOS instructions after a delay if on iOS
      if (isIOS) {
        const timer = setTimeout(() => {
          setShowInstallBanner(true)
        }, 3000)
        return () => clearTimeout(timer)
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!installPrompt) return

    try {
      // Show the install prompt
      await installPrompt.prompt()

      // Wait for the user to respond to the prompt
      const choiceResult = await installPrompt.userChoice
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt")
        localStorage.setItem("pwa-installed", "true")
        setIsPWAInstalled(true)
      }
    } catch (error) {
      console.error("Error during installation:", error)
    }

    // Clear the saved prompt as it can't be used again
    setInstallPrompt(null)
    setShowInstallBanner(false)
  }

  const dismissInstallBanner = () => {
    setShowInstallBanner(false)
    // Remember user dismissed the banner
    localStorage.setItem("pwa-install-dismissed", "true")
  }

  if (isPWAInstalled || !showInstallBanner) {
    return null
  }

  if (isIOSDevice) {
    return (
      <Card className="fixed bottom-16 left-4 right-4 z-50 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Install this app</CardTitle>
            <Button variant="ghost" size="sm" onClick={dismissInstallBanner} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Add to your home screen for offline use</CardDescription>
        </CardHeader>
        <CardContent className="pb-2 text-sm">
          <p>
            Tap <span className="inline-block bg-blue-100 text-blue-800 px-1 rounded">Share</span> and then{" "}
            <span className="font-medium">&quot;Add to Home Screen&quot;</span>
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="fixed bottom-16 left-4 right-4 z-50 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Install this app</CardTitle>
          <Button variant="ghost" size="sm" onClick={dismissInstallBanner} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Install for offline use</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button onClick={handleInstallClick} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Install App
        </Button>
      </CardFooter>
    </Card>
  )
}

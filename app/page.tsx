"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Home, Users, BookOpen, Menu, Wifi, WifiOff } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import HomePage from "./components/home-page"
import AttendancePage from "./components/attendance-page"
import AppSidebar from "./components/app-sidebar"
import SavingSessionsPage from "./components/saving-sessions-page"
import PWAInstaller from "./components/pwa-installer"
import { AttendanceRecord, Page, SavingSession, Student } from "@/lib/types"
import { Session } from "inspector/promises"
import DesktopApp from "./components/desktop-app"
import BottomNav from "./components/bottom-nav"
import { getPageTitle } from "@/lib/utils"
import Header from "./components/header"


import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"

const mockSavingSessions: SavingSession[] = [
  {
    id: 1,
    student: { id: "1", name: "Ahmed Mohamed" },
    from: 15,
    to: 25,
    duration: 12,
    mistakes: [{ name: "Mispronunciation" }, { name: "Skipped word" }],
    points: 85,
    result: "Good",
  },
  {
    id: 2,
    student: { id: "2", name: "Fatima Ali" },
    from: 10,
    to: 20,
    duration: 15,
    mistakes: [{ name: "Wrong pronunciation" }, { name: "Hesitation" }, { name: "Repeated word" }],
    points: 70,
    result: "Average",
  },
  {
    id: 3,
    student: { id: "3", name: "Omar Hassan" },
    from: 5,
    to: 15,
    duration: 8,
    mistakes: [],
    points: 95,
    result: "Excellent",
  },
  {
    id: 4,
    student: { id: "4", name: "Nour Ibrahim" },
    from: 20,
    to: 30,
    duration: 18,
    mistakes: [{ name: "Mispronunciation" }, { name: "Wrong word" }, { name: "Skipped line" }, { name: "Hesitation" }],
    points: 55,
    result: "Needs Improvement",
  },
  {
    id: 5,
    student: { id: "5", name: "Youssef Ahmed" },
    from: 1,
    to: 10,
    duration: 10,
    mistakes: [{ name: "Mispronunciation" }],
    points: 80,
    result: "Good",
  },
]

const mockStudents: Student[] = [
  { id: "1", name: "Ahmed Mohamed" },
  { id: "2", name: "Fatima Ali" },
  { id: "3", name: "Omar Hassan" },
  { id: "4", name: "Nour Ibrahim" },
  { id: "5", name: "Youssef Ahmed" },
  { id: "6", name: "Maryam Khaled" },
]

const groupInfo = {
  name: "Mathematics Grade 10",
  teacher: "Dr. Sarah Johnson",
}

export default function PWAApp() {
  const [isOnline, setIsOnline] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [isDesktop, setIsDesktop] = useState(false)
  const [students] = useState<Student[]>(mockStudents)
  const [sessions, setSessions] = useState<Session[]>([])
  const [savingSessions, setSavingSessions] = useState<SavingSession[]>(mockSavingSessions)

  const router = useRouter()

  // redirect to login if no access token for app
  useEffect(() => {

    const accessToken = Cookies.get('teacher-access-token')
    if (!accessToken?.length) router.replace('/login')
  }, [])
  const handleAttendanceSubmit = (attendanceRecords: AttendanceRecord[]) => {
  
  }



  if (isDesktop) {
    return (
      <DesktopApp />
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <AppSidebar />

        {/* Main Content */}
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header currentPage={currentPage} />

          {/* Page Content */}
          <main className="flex-1 p-4 pb-20">
            {currentPage === "home" && <HomePage groupInfo={groupInfo} students={students} />}
            {currentPage === "attendance" && <AttendancePage students={students} onSubmit={handleAttendanceSubmit} />}
            {currentPage === "sessions" && <SavingSessionsPage savingSessions={savingSessions} />}
          </main>

          {/* Bottom Navigation */}
          <BottomNav />

          {/* PWA Install Prompt */}
          <PWAInstaller />
        </div>
      </div>
    </SidebarProvider>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, X, Clock, ChevronDown } from "lucide-react"

interface Student {
  id: string
  name: string
  avatar?: string
}

interface AttendanceRecord {
  studentId: string
  status: "attend" | "missed" | "delay"
  delayAmount?: string
  timestamp: string
}

interface AttendancePageProps {
  students: Student[]
  onSubmit: (records: AttendanceRecord[]) => void
}

export default function AttendancePage({ students, onSubmit }: AttendancePageProps) {
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceRecord>>({})

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const updateAttendance = (studentId: string, status: "attend" | "missed" | "delay", delayAmount?: string) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: {
        studentId,
        status,
        delayAmount,
        timestamp: new Date().toISOString(),
      },
    }))
  }

  const handleSubmit = () => {
    const records = Object.values(attendanceRecords)
    if (records.length === 0) {
      alert("Please mark attendance for at least one student")
      return
    }
    onSubmit(records)
  }

  const getStatusColor = (status: "attend" | "missed" | "delay") => {
    switch (status) {
      case "attend":
        return "bg-primary text-primary-foreground"
      case "missed":
        return "bg-destructive text-destructive-foreground"
      case "delay":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const delayOptions = ["15 min", "30 min", "1 h", "more than that"]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Take Attendance</h2>
        <p className="text-muted-foreground text-sm">Mark attendance for each student</p>
      </div>

      {/* Students List */}
      <div className="space-y-3">
        {students.map((student) => {
          const record = attendanceRecords[student.id]
          return (
            <Card key={student.id} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground">{student.name}</h3>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={record?.status === "attend" ? "default" : "outline"}
                    onClick={() => updateAttendance(student.id, "attend")}
                    className="flex-1"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Attend
                  </Button>

                  <Button
                    size="sm"
                    variant={record?.status === "missed" ? "destructive" : "outline"}
                    onClick={() => updateAttendance(student.id, "missed")}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Missed
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant={record?.status === "delay" ? "secondary" : "outline"}
                        className="flex-1"
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        {record?.status === "delay" && record?.delayAmount ? `Delay` : "Delay"}
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      {delayOptions.map((option) => (
                        <DropdownMenuItem
                          key={option}
                          onClick={() => updateAttendance(student.id, "delay", option)}
                          className="cursor-pointer"
                        >
                          {option}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button onClick={handleSubmit} className="w-full" size="lg">
          Submit Attendance
        </Button>
      </div>
    </div>
  )
}

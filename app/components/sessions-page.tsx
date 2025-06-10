import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from "lucide-react"

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

interface Session {
  id: string
  date: string
  attendanceRecords: AttendanceRecord[]
  duration: string
}

interface SessionsPageProps {
  sessions: Session[]
  students: Student[]
}

export default function SessionsPage({ sessions, students }: SessionsPageProps) {
  const getStudentName = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    return student?.name || "Unknown Student"
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

  const getSessionStats = (session: Session) => {
    const total = session.attendanceRecords.length
    const attended = session.attendanceRecords.filter((r) => r.status === "attend").length
    const delayed = session.attendanceRecords.filter((r) => r.status === "delay").length
    const missed = session.attendanceRecords.filter((r) => r.status === "missed").length

    return { total, attended, delayed, missed }
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Sessions Yet</h3>
        <p className="text-muted-foreground">Start taking attendance to see sessions here</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Saved Sessions</h2>
        <p className="text-muted-foreground text-sm">View all attendance sessions</p>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => {
          const stats = getSessionStats(session)
          return (
            <Card key={session.id} className="bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {session.date}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {session.duration}
                  </div>
                </div>
                <div className="flex gap-2 text-xs">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {stats.attended} Attended
                  </Badge>
                  {stats.delayed > 0 && (
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      {stats.delayed} Delayed
                    </Badge>
                  )}
                  {stats.missed > 0 && (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      {stats.missed} Missed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {session.attendanceRecords.map((record) => (
                    <div
                      key={record.studentId}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <span className="text-sm font-medium text-card-foreground">
                        {getStudentName(record.studentId)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getStatusColor(record.status)}`}>
                          {record.status === "delay" && record.delayAmount
                            ? `Delay (${record.delayAmount})`
                            : record.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(record.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, BookOpen, Target, Award } from "lucide-react"

interface Student {
  id: string
  name: string
  avatar?: string
}

interface Mistake {
  name: string
}

interface SavingSession {
  id: number
  student: Student
  from: number
  to: number
  duration: number
  mistakes: Mistake[]
  points: number
  result: string
}

interface SavingSessionsPageProps {
  savingSessions: SavingSession[]
}

export default function SavingSessionsPage({ savingSessions }: SavingSessionsPageProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getResultColor = (result: string) => {
    switch (result.toLowerCase()) {
      case "excellent":
        return "bg-primary text-primary-foreground"
      case "good":
        return "bg-secondary text-secondary-foreground"
      case "average":
        return "bg-yellow-500 text-white"
      case "needs improvement":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (savingSessions.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Saving Sessions Yet</h3>
        <p className="text-muted-foreground">Saving sessions will appear here once created</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Saving Sessions</h2>
        <p className="text-muted-foreground text-sm">Student reading progress and results</p>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {savingSessions.map((session) => (
          <Card key={session.id} className="bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {getInitials(session.student.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base">{session.student.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <BookOpen className="w-3 h-3" />
                    <span>
                      From {session.from} to {session.to}
                    </span>
                  </div>
                </div>
                <Badge className={`${getResultColor(session.result)} text-xs`}>{session.result}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-primary/10 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-primary">Points</span>
                  </div>
                  <div className="text-lg font-bold text-primary">{session.points}</div>
                </div>
                <div className="bg-secondary/10 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-secondary" />
                    <span className="text-xs font-medium text-secondary">Duration</span>
                  </div>
                  <div className="text-lg font-bold text-secondary">{session.duration}m</div>
                </div>
                <div className="bg-destructive/10 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="w-3 h-3 text-destructive" />
                    <span className="text-xs font-medium text-destructive">Mistakes</span>
                  </div>
                  <div className="text-lg font-bold text-destructive">{session.mistakes.length}</div>
                </div>
              </div>

              {/* Mistakes */}
              {session.mistakes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Mistakes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {session.mistakes.map((mistake, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-destructive/5 text-destructive border-destructive/20"
                      >
                        {mistake.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

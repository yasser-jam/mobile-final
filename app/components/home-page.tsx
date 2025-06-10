import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, GraduationCap } from "lucide-react"

interface Student {
  id: string
  name: string
  avatar?: string
}

interface GroupInfo {
  name: string
  teacher: string
}

interface HomePageProps {
  groupInfo: GroupInfo
  students: Student[]
}

export default function HomePage({ groupInfo, students }: HomePageProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Group Info Card */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg">{groupInfo.name}</CardTitle>
              <p className="text-primary-foreground/80 text-sm">Teacher: {groupInfo.teacher}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm">
            <span>Total Students</span>
            <span className="font-semibold">{students.length}</span>
          </div>
        </CardContent>
      </Card>

      {/* Students Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Students</h2>
        <div className="grid gap-3">
          {students.map((student) => (
            <Card key={student.id} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">Student ID: {student.id}</p>
                  </div>
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-xl">Page Not Found</CardTitle>
          <CardDescription>The page you're looking for doesn't exist.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/">
            <Button className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

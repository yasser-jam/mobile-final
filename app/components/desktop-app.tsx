import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone } from "lucide-react";

export default function DesktopApp() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <div className='mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
            <Smartphone className='w-8 h-8 text-blue-600' />
          </div>
          <CardTitle className='text-2xl'>Mobile App Only</CardTitle>
          <CardDescription className='text-base'>
            This PWA is designed for mobile devices only
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            Please access this application from your mobile device or resize
            your browser window to mobile size to use the app.
          </p>
          <div className='bg-blue-50 p-4 rounded-lg'>
            <p className='text-sm font-medium text-blue-800'>
              📱 Scan QR code or visit this URL on your mobile device
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

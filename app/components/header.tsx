import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getPageTitle } from '@/lib/utils';
import { Menu, Wifi, WifiIcon, WifiOff } from 'lucide-react';
import { useState } from 'react';

interface PropsInterface {
  currentPage: string;
}

export default function Header({ currentPage }: PropsInterface) {
  const [isOnline, setIsOnline] = useState(true);
  const [serviceWorkerRegistered, setServiceWorkerRegistered] = useState(false)

  return (
    <header className='bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-40'>
      <div className='flex items-center gap-3'>
        <SidebarTrigger>
          <Menu className='w-5 h-5' />
        </SidebarTrigger>
        <h1 className='font-semibold text-lg text-foreground'>
          {getPageTitle(currentPage)}
        </h1>
      </div>
      <div className='flex items-center gap-2'>
        {isOnline ? (
          <Badge
            variant='secondary'
            className='text-xs bg-primary text-primary-foreground'
          >
            <WifiIcon className='w-3 h-3 mr-1' />
            Online
          </Badge>
        ) : (
          <Badge variant='destructive' className='text-xs'>
            <WifiOff className='w-3 h-3 mr-1' />
            Offline
          </Badge>
        )}
        {serviceWorkerRegistered && (
          <Badge
            variant='outline'
            className='text-xs bg-green-50 text-green-700 border-green-200'
          >
            PWA Ready
          </Badge>
        )}
      </div>
    </header>
  );
}

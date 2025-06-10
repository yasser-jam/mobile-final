import { Button } from "@/components/ui/button";
import { Page } from "@/lib/types";
import { BookOpen, Home, Users } from "lucide-react";
import { useState } from "react";


export default function BottomNav() {

  const [currentPage, setCurrentPage] = useState<Page>("home")

  return (
    <>
      <nav className='fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2'>
        <div className='flex justify-around'>
          <Button
            variant={currentPage === 'home' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setCurrentPage('home')}
            className='flex flex-col items-center gap-1 h-auto py-2 px-3'
          >
            <Home className='w-4 h-4' />
            <span className='text-xs'>Home</span>
          </Button>
          <Button
            variant={currentPage === 'attendance' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setCurrentPage('attendance')}
            className='flex flex-col items-center gap-1 h-auto py-2 px-3'
          >
            <Users className='w-4 h-4' />
            <span className='text-xs'>Attendance</span>
          </Button>
          <Button
            variant={currentPage === 'sessions' ? 'default' : 'ghost'}
            size='sm'
            onClick={() => setCurrentPage('sessions')}
            className='flex flex-col items-center gap-1 h-auto py-2 px-3'
          >
            <BookOpen className='w-4 h-4' />
            <span className='text-xs'>Sessions</span>
          </Button>
        </div>
      </nav>
    </>
  );
}

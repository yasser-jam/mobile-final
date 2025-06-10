export type Page = 'home' | 'attendance' | 'sessions';

export interface Student {
  id: string;
  name: string;
  avatar?: string;
}

export interface AttendanceRecord {
  studentId: string;
  status: 'attend' | 'missed' | 'delay';
  delayAmount?: string;
  timestamp: string;
}

export interface Session {
  id: string;
  date: string;
  attendanceRecords: AttendanceRecord[];
  duration: string;
}

export interface Mistake {
  name: string;
}

export interface SavingSession {
  id: number;
  student: Student;
  from: number;
  to: number;
  duration: number;
  mistakes: Mistake[];
  points: number;
  result: string;
}

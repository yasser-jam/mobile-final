import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPageTitle = (currentPage: string) => {
  switch (currentPage) {
    case "home":
      return "Home"
    case "attendance":
      return "Take Attendance"
    case "sessions":
      return "Sessions"
    default:
      return "Attendance App"
  }
}
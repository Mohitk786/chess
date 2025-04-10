import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const BASE_URL="http://51.20.79.155:8000/api"
export const WS_URL="ws://51.20.79.155:5000"
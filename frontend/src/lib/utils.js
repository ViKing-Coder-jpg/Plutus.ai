import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from 'axios'

const baseServerURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const api=axios.create({
      baseURL: baseServerURL 
})

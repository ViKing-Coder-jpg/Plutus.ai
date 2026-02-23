import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from 'axios'

const baseServerURL = 'https://plutus-ai.onrender.com'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const api=axios.create({
      baseURL: baseServerURL 
})

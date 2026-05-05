import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pageTitle(pageName: string) {
  return `${pageName} | TRIA Lab`
}

export function openGraph({
  title,
  description = "TRustworthy Intelligence for Autonomous systems Laboratory",
  url,
  type,
}: {
  title: string
  description?: string
  url?: string
  type?: string
}) {
  return {
    title: pageTitle(title),
    description,
    ...(url && { url }),
    ...(type && { type }),
  }
}

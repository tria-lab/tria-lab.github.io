import { siteConfig } from "./config"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pageTitle(pageName: string) {
  return `${pageName} | ${siteConfig.title}`
}

export function openGraph({
  title,
  description,
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
    description: description || siteConfig.description,
    ...(url && { url }),
    ...(type && { type }),
  }
}

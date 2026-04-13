"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/announcements", label: "Announcements" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isActive = (href: string) => {
    const normalize = (path: string) => path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/"
    return normalize(pathname) === normalize(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-17.5 border-b bg-white transition-shadow",
          isScrolled && "shadow-md",
        )}
      >
        <div className="mx-auto flex h-full max-w-350 items-center justify-between px-6">
          <Link
            href="/"
            className="text-xl font-bold text-hongik-black hover:text-hongik-midnight-blue"
          >
            [LOGO] TRIA LAB
            {/* Empty logo */}
          </Link>

          <nav className="hidden lg:block">
            <ul className="m-0 flex list-none items-center gap-8 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group relative py-2 font-medium no-underline transition-colors",
                      isActive(link.href)
                        ? "text-hongik-midnight-blue"
                        : "text-hongik-black hover:text-hongik-midnight-blue",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-hongik-midnight-blue transition-all duration-300",
                        isActive(link.href) ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer flex-col gap-1.5 border-none bg-none p-2 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span
              className={cn(
                "block h-0.5 w-6 bg-hongik-black transition-transform duration-150",
                isOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-hongik-black transition-opacity duration-150",
                isOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-hongik-black transition-transform duration-150",
                isOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
      />

      <nav
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-6">
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-hongik-black hover:text-hongik-midnight-blue"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-sm px-4 py-2 font-medium no-underline transition-colors",
                    isActive(link.href)
                      ? "bg-[#f7fafc] text-hongik-midnight-blue"
                      : "text-hongik-black hover:bg-[#f7fafc] hover:text-hongik-midnight-blue",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

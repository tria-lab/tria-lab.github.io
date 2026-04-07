"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/publications", label: "Publications" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isActive = (href: string) => {
    const currentPath = pathname.split("?")[0].split("#")[0]
    const linkPath = href.split("?")[0].split("#")[0]
    return currentPath === linkPath
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
        className={`fixed top-0 right-0 left-0 z-50 h-[70px] border-b bg-white transition-shadow ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
          <Link
            href="/"
            className="text-hongik-black hover:text-hongik-midnight-blue text-xl font-bold"
          >
            [LOGO] TRIA LAB
            {/* Empty logo */}
          </Link>

          <nav className="hidden md:block">
            <ul className="m-0 flex list-none items-center gap-8 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group relative py-2 font-medium no-underline transition-colors ${
                      isActive(link.href)
                        ? "text-hongik-midnight-blue"
                        : "text-hongik-black hover:text-hongik-midnight-blue"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`bg-hongik-midnight-blue absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                        isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer flex-col gap-1.5 border-none bg-none p-2 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span
              className={`bg-hongik-black block h-0.5 w-6 transition-transform duration-150 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`bg-hongik-black block h-0.5 w-6 transition-opacity duration-150 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`bg-hongik-black block h-0.5 w-6 transition-transform duration-150 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <nav
        className={`fixed top-0 right-0 bottom-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-hongik-black hover:text-hongik-midnight-blue text-2xl"
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
                  className={`block rounded px-4 py-2 font-medium no-underline transition-colors ${
                    isActive(link.href)
                      ? "text-hongik-midnight-blue bg-[#f7fafc]"
                      : "text-hongik-black hover:text-hongik-midnight-blue hover:bg-[#f7fafc]"
                  }`}
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

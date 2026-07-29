"use client"

import { type Locale, localePath } from "@/i18n/config"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/team", label: "team" },
  { href: "/publications", label: "publications" },
  { href: "/blog", label: "blog" },
  { href: "/news", label: "news" },
  { href: "/contact", label: "contact" },
] as const satisfies { href: string; label: string }[]

export default function Navbar({ lang }: { lang: Locale }) {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isActive = (href: string) => {
    const normalize = (path: string) => path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/"
    return normalize(pathname) === normalize(localePath(lang, href))
  }

  const alternateLang: Locale = lang === "en" ? "ko" : "en"
  const pathWithoutLocale = pathname.replace(/^\/(en|ko)(?=\/|$)/, "") || "/"
  const alternatePath = localePath(alternateLang, pathWithoutLocale)

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
          "fixed inset-x-0 top-0 z-60 h-17.5 border-b bg-white transition-shadow",
          isScrolled && "shadow-md",
        )}
      >
        <div className="mx-auto flex h-full max-w-350 items-center justify-between px-6">
          <Link
            href={localePath(lang)}
            className="text-xl font-bold text-hongik-black hover:text-hongik-medium-blue"
          >
            [LOGO] TRIA LAB
            {/* Empty logo */}
          </Link>

          <nav className="hidden lg:block">
            <ul className="m-0 flex list-none items-center gap-8 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(lang, link.href)}
                    className={cn(
                      "group relative py-2 font-medium no-underline transition-colors",
                      isActive(link.href)
                        ? "text-hongik-medium-blue"
                        : "text-hongik-black hover:text-hongik-medium-blue",
                    )}
                  >
                    {t(`nav.${link.label}`)}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-hongik-medium-blue transition-all duration-300",
                        isActive(link.href) ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href={alternatePath}
            hrefLang={alternateLang}
            lang={alternateLang}
            aria-label={t("nav.switchTo", { language: t(`language.${alternateLang}`) })}
            className="hidden rounded-sm border border-hongik-light-gray px-2.5 py-1.5 text-sm font-medium no-underline transition-colors hover:border-hongik-medium-blue hover:text-hongik-medium-blue lg:block"
          >
            {alternateLang === "ko" ? "한국어" : "English"}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer flex-col gap-1.5 border-none bg-none p-2 lg:hidden"
            aria-label={t("nav.toggle")}
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
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-6 pt-17.5">
          <ul className="m-0 flex list-none flex-col gap-4 px-0 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={localePath(lang, link.href)}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-sm px-4 py-2 font-medium no-underline transition-colors",
                    isActive(link.href)
                      ? "bg-[#f7fafc] text-hongik-medium-blue"
                      : "text-hongik-black hover:bg-[#f7fafc] hover:text-hongik-medium-blue",
                  )}
                >
                  {t(`nav.${link.label}`)}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-hongik-light-gray pt-4">
              <Link
                href={alternatePath}
                hrefLang={alternateLang}
                lang={alternateLang}
                onClick={() => setIsOpen(false)}
                className="block rounded-sm px-4 py-2 font-medium no-underline transition-colors hover:bg-[#f7fafc] hover:text-hongik-medium-blue"
              >
                {alternateLang === "ko" ? "한국어" : "English"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

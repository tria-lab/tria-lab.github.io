"use client"

import { type Locale } from "./config"
import { resources } from "./resources"
import { createInstance } from "i18next"
import { useState } from "react"
import { I18nextProvider, initReactI18next } from "react-i18next"

export default function I18nProvider({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: Locale
}) {
  const [i18n] = useState(() => {
    const instance = createInstance()
    void instance.use(initReactI18next).init({
      lng: lang,
      fallbackLng: "en",
      resources,
      interpolation: { escapeValue: false },
    })
    return instance
  })

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

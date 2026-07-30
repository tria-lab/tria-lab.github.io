import JsonLd from "@/components/JsonLd"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getTranslation, localePath, type Locale } from "@/i18n/config"
import { siteConfig } from "@/lib/config"
import Link from "next/link"
import { Fragment } from "react"
import type { BreadcrumbList as SchemaBreadcrumbList, WithContext } from "schema-dts"

type BreadcrumbItem = {
  name: string
  path: string
}

export default async function Breadcrumbs({
  items,
  lang,
}: {
  items: BreadcrumbItem[]
  lang: Locale
}) {
  const { t } = await getTranslation(lang)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${localePath(lang, item.path)}`,
    })),
  } as const satisfies WithContext<SchemaBreadcrumbList>

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb aria-label={t("common.breadcrumb")} className="mb-6">
        <BreadcrumbList className="gap-x-2 gap-y-1">
          {items.map((item, index) => {
            const href = localePath(lang, item.path)
            const current = index === items.length - 1

            return (
              <Fragment key={href}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {current ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={href} />}>{item.name}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}

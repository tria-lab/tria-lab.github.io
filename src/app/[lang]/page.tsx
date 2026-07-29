import BlogMetadata from "@/components/BlogMetadata"
import { A } from "@/components/Link"
import { formatDate, getTranslation, hasLocale, localePath, locales } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import { getDirMetadata } from "@/lib/content/getMetadata"
import { getPublications } from "@/lib/content/getPublications"
import { getTeam } from "@/lib/content/getTeam"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { t } = await getTranslation(lang)
  return localizedMetadata({ lang, title: t("page.home") })
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) return null
  const { t } = await getTranslation(lang)
  const { professors, students } = getTeam()
  const publications = getPublications()
  const blogPosts = getDirMetadata(lang, "blog")
  const newsPosts = getDirMetadata(lang, "news")
  const latestPublication = publications[0]
  const latestBlog = blogPosts[0]
  const latestNews = newsPosts[0]
  const teamCount = professors.length + students.length

  const stats = [
    {
      count: teamCount,
      label: t("home.stats.team", { count: teamCount }),
      href: "/team",
    },
    {
      count: publications.length,
      label: t("home.stats.publications", { count: publications.length }),
      href: "/publications",
    },
    {
      count: blogPosts.length,
      label: t("home.stats.blog", { count: blogPosts.length }),
      href: "/blog",
    },
    {
      count: newsPosts.length,
      label: t("home.stats.news", { count: newsPosts.length }),
      href: "/news",
    },
  ] as const

  return (
    <div className="overflow-x-clip">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[minmax(0,3fr)_minmax(16rem,2fr)] md:items-end lg:py-28">
        <div className="min-w-0">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            TRIA Lab
          </h1>
          <p className="max-w-3xl text-lg/relaxed font-semibold text-pretty text-hongik-dark-gray sm:text-xl">
            {/* cSpell: disable-next-line */}
            <span className="font-bold text-hongik-black">TR</span>ustworthy
            {" " /* cSpell: disable-next-line */}
            <span className="font-bold text-hongik-black">I</span>ntelligence for
            {" " /* cSpell: disable-next-line */}
            <span className="font-bold text-hongik-black">A</span>utonomous systems Laboratory
          </p>
        </div>

        <div className="border-t border-hongik-light-gray pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <p className="mb-7 text-xl/relaxed font-medium text-pretty">{t("home.mission")}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <A
              href={localePath(lang, "/contact")}
              className="min-h-11 bg-hongik-medium-blue px-5 py-3 text-hongik-white no-underline hover:bg-hongik-midnight-blue hover:text-hongik-white hover:no-underline"
            >
              {t("home.contactLab")}
              <ArrowRight aria-hidden="true" size={18} />
            </A>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-snapshot" className="mx-auto max-w-6xl px-6 pb-20 lg:pb-28">
        <ul className="grid border-y border-hongik-light-gray sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ count, label, href }, index) => (
            <li
              key={href}
              className={`border-hongik-light-gray ${
                index < stats.length - 1 ? "border-b" : ""
              } ${index === 2 ? "sm:border-b-0" : ""} ${index % 2 === 0 ? "sm:border-r" : ""} ${
                index === 1 ? "lg:border-r" : ""
              } lg:border-b-0`}
            >
              <A
                href={localePath(lang, href)}
                className="group flex min-h-36 w-full flex-col items-start justify-between p-5 no-underline hover:bg-hongik-bright-gray hover:no-underline lg:min-h-40 lg:p-6"
              >
                <span className="text-4xl font-bold tracking-tight text-hongik-black tabular-nums lg:text-5xl">
                  {count}
                </span>
                <span className="flex w-full items-center justify-between gap-4 text-hongik-stone-gray group-hover:text-hongik-medium-blue">
                  {label}
                  <ArrowRight
                    aria-hidden="true"
                    size={18}
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </A>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="home-recent-work" className="bg-hongik-bright-gray">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="home-recent-work" className="text-3xl font-bold tracking-tight text-balance">
                {t("home.latestPublication")}
              </h2>
            </div>
            <A href={localePath(lang, "/publications")}>{t("page.publications")}</A>
          </div>

          {latestPublication ? (
            <article className="grid gap-6 border-t border-hongik-light-gray pt-8 md:grid-cols-[minmax(0,3fr)_minmax(12rem,1fr)]">
              <div className="min-w-0">
                <h3 className="mb-4 max-w-4xl text-2xl/snug font-semibold text-balance sm:text-3xl">
                  {lang === "en" ? latestPublication.titleEn : latestPublication.titleKo}
                </h3>
                <p className="text-lg text-hongik-dark-gray">
                  {lang === "en" ? latestPublication.authorsEn : latestPublication.authorsKo}
                </p>
              </div>
              <div className="flex flex-col items-start justify-between gap-6 md:items-end md:text-right">
                <time
                  dateTime={latestPublication.date.replaceAll(".", "-")}
                  className="text-sm text-hongik-dark-gray"
                >
                  {formatDate(latestPublication.date.replaceAll(".", "-"), lang)}
                </time>
                <A href={latestPublication.link}>{t("home.readPublication")}</A>
              </div>
            </article>
          ) : (
            <p>{t("home.noPublication")}</p>
          )}
        </div>
      </section>

      <section aria-labelledby="home-latest" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <h2 id="home-latest" className="mb-10 text-3xl font-bold tracking-tight text-balance">
          {t("home.latestFromLab")}
        </h2>

        <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-t border-hongik-light-gray pt-5">
              <h3 className="text-lg font-semibold">{t("home.latestBlog")}</h3>
              <A href={localePath(lang, "/blog")} className="text-sm whitespace-nowrap">
                {t("home.viewAllBlog")}
              </A>
            </div>
            {latestBlog ? (
              <article>
                <h4 className="mb-3 text-2xl/snug font-semibold text-balance">
                  <A href={localePath(lang, `/blog/${latestBlog.slug}`)}>{latestBlog.title}</A>
                </h4>
                <BlogMetadata metadata={latestBlog} lang={lang} className="mb-4 flex-wrap" />
                <p className="leading-relaxed text-pretty text-hongik-stone-gray">
                  {latestBlog.excerpt}
                </p>
              </article>
            ) : (
              <p>{t("home.noBlog")}</p>
            )}
          </div>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-t border-hongik-light-gray pt-5">
              <h3 className="text-lg font-semibold">{t("home.latestNews")}</h3>
              <A href={localePath(lang, "/news")} className="text-sm whitespace-nowrap">
                {t("home.viewAllNews")}
              </A>
            </div>
            {latestNews ? (
              <article>
                <h4 className="mb-3 text-2xl/snug font-semibold text-balance">
                  <A href={localePath(lang, `/news/${latestNews.slug}`)}>{latestNews.title}</A>
                </h4>
                <time dateTime={latestNews.date} className="mb-4 block text-sm text-zinc-500">
                  {formatDate(latestNews.date, lang)}
                </time>
                <p className="leading-relaxed text-pretty text-hongik-stone-gray">
                  {latestNews.excerpt}
                </p>
              </article>
            ) : (
              <p>{t("home.noNews")}</p>
            )}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="home-contact"
        className="bg-hongik-midnight-blue text-hongik-white selection:bg-hongik-white selection:text-hongik-black!"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[minmax(0,3fr)_minmax(12rem,1fr)] md:items-end lg:py-20">
          <div>
            <h2
              id="home-contact"
              className="mb-4 max-w-4xl text-3xl/tight font-bold text-balance sm:text-4xl"
            >
              {t("home.contactTitle")}
            </h2>
            <p className="max-w-2xl text-lg/relaxed text-pretty text-hongik-light-gray">
              {t("home.contactBody")}
            </p>
          </div>
          <A
            href={localePath(lang, "/contact")}
            className="min-h-11 justify-center bg-hongik-white px-5 py-3 text-hongik-midnight-blue no-underline hover:bg-hongik-mint hover:text-hongik-midnight-blue hover:no-underline md:justify-self-end"
          >
            {t("home.contactLab")}
            <ArrowRight aria-hidden="true" size={18} />
          </A>
        </div>
      </section>
    </div>
  )
}

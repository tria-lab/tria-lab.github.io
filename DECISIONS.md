# Decisions

This document is a collection of broad-stroke design decisions made for the codebase.

## Formatter

Despite new-gen tools such as [oxfmt] quickly gaining popularity, a decision has been made to
use [prettier] for the time being since there are many rough edges such as its
[inability to format certain files][oxfmt-bug-1], or [bun support][oxfmt-bug-2].
Migrating to it should be relatively straightforward for whoever inherits this codebase after 2028.

## Package versions

A good software engineer must be intentional about the choice of dependency. There is an endless
list ([1][npm-1], [2][npm-2], [3][npm-3]) of security incidents that could have been avoided by
pinning dependency versions and properly auditing packages when updating. The same mistake shall not
happen in this codebase.

## Deploy Environment

[Github pages](https://docs.github.com/en/pages) is the "default" choice for hosting static web
content. However, we chose to use [Sevalla](https://sevalla.com) for following reasons:

1. **fewer Downtimes**\
   Github pages is an unreliable platform. Ever since 2020, it has experienced downtimes lasting up
   to 14 hours every 2~3 weeks. Sevalla has had 4 since they were founded (June 2024).
2. **Analytics**\
   Sevalla comes with basic analytics showing the amount of traffic per country, request rate,
   response time (avg, P90, P95, P99), error/success rates, top pages, etc.
3. **No cost overhead**\
   Hosting static sites on sevalla is free. Just like Github pages.

## Tech Stack

Static sites, if not written in raw HTML, CSS, and JS, are usually generated using software by the
likes of [hugo](https://gohugo.io), [hexo](https://hexo.io), or [zola](https://www.getzola.org).
However, we have made the unusual, and often frowned-upon decision to use
[Nextjs](https://nextjs.org/), a meta-framework of [React](https://react.dev). This opens a path to
add features that require a server such as Q&A page, server-side search, and
[SSR](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering).

This choice does not hurt talent availability either since React is the most popular web UI
framework by a huge margin, and is something that every front-end web developers are expected to
know (even those who do not have to use it). Also,
[coding LLMs have almost fully internalized the Nextjs API](https://blog.cloudflare.com/vinext/),
so the AI agents can be used to work on the codebase with high degree of reliability.

## Font

[Pretendard GOV](https://github.com/orioncactus/pretendard/tree/main/packages/pretendard-gov)
is a clean, modern font supports many different languages including English, Korean, Chinese, and
Japanese. See https://namu.wiki/w/Pretendard%20GOV for more info.

<!-- Formatter -->

[oxfmt]: https://oxc.rs/docs/guide/usage/formatter.html
[prettier]: https://prettier.io
[oxfmt-bug-1]: https://github.com/oxc-project/oxc/issues/16729#issuecomment-3908510498
[oxfmt-bug-2]: https://github.com/oven-sh/bun/issues/25610

<!-- Package versions -->

[npm-1]: https://www.youtube.com/watch?v=OSNObKP-tB4
[npm-2]: https://www.youtube.com/watch?v=lqZo4waMB3c
[npm-3]: https://www.youtube.com/watch?v=yiLIZLPNEm8

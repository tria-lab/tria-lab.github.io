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

<!-- Formatter -->

[oxfmt]: https://oxc.rs/docs/guide/usage/formatter.html
[prettier]: https://prettier.io
[oxfmt-bug-1]: https://github.com/oxc-project/oxc/issues/16729#issuecomment-3908510498
[oxfmt-bug-2]: https://github.com/oven-sh/bun/issues/25610

<!-- Package versions -->

[npm-1]: https://www.youtube.com/watch?v=OSNObKP-tB4
[npm-2]: https://www.youtube.com/watch?v=lqZo4waMB3c
[npm-3]: https://www.youtube.com/watch?v=yiLIZLPNEm8

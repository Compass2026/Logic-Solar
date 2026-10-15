# PREVIEW FIXTURE: do not merge

This branch (`compass/preview-blog-campaign-a`) exists only to show the Compass
blog contract on a Vercel preview. It adds ONE sample article to
`data/blog-posts.json` plus its hero image:

- Logic Solar Campaign A, CRM draft `a922bdfa-2adb-4a80-8fe2-c8f489beed00`
  (version 2, **in review, not approved**), generated with the CRM's own
  `preparePublication` exactly as blog-publisher would write it.
- Hero: CRM brand asset `2d897658-6dd0-4b0b-9180-1456219497e0`, a
  ChatGPT-generated, non-evidentiary illustration (sha256 `571a4c1c…`).

Its release hash is the all-zero PREVIEW hash. `scripts/blog-build.js`
refuses it on any production build (`VERCEL_ENV=production`), so even a merge
by mistake fails the deploy instead of publishing. The page is noindexed and
labelled as a preview fixture. Real articles arrive only through the CRM
after a human approval. Close this branch after review; never merge it.

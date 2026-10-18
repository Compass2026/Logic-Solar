# PREVIEW FIXTURE: do not merge

This branch (`compass/preview-blog-campaign-a`) exists only to show Logic Solar
blog drafts on a Vercel preview, so Tom and Logic's owner can review them as
they would look on the site before anything is approved. It adds sample
articles to `data/blog-posts.json` plus one hero image. Every entry was
generated with the CRM's own `preparePublication`, exactly as blog-publisher
would write it (TL;DR in its own slot), from the draft that is **in review, not approved**:

| Article | CRM draft | Version | Hero |
| --- | --- | --- | --- |
| A: solar installation in Overland Park, design consultation | `a922bdfa-2adb-4a80-8fe2-c8f489beed00` | 6 | `2d897658…`, a ChatGPT-generated, non-evidentiary illustration (sha256 `571a4c1c…`) |
| B: solar battery backup in Overland Park, essential loads | `63344ed3-7e71-4a4a-943a-d8192dc1bf9d` | 3 | none yet |
| C: what shapes a solar panel installation quote in Wichita | `019c1eb1-9378-41d7-b21b-3700104fbe3e` | 2 | none yet |

Their release hash is the all-zero PREVIEW hash. `scripts/blog-build.js`
refuses it on any production build (`VERCEL_ENV=production`), so even a merge
by mistake fails the deploy instead of publishing. The pages are noindexed and
labelled as preview fixtures. Real articles arrive only through the CRM after
a human approval. Close this branch after review; never merge it.

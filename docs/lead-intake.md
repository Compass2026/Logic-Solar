# Homepage funnel → Logic lead intake

The homepage savings funnel (`src/components/SavingsFunnel.tsx`) posts each
lead to our own `/api/lead` (`api/lead.js`). That route re-checks the answers
and sends them **server-side** to Logic's intake:

`POST https://logic-portal.com/api/lead-intake/site`
with `Content-Type: application/json` and `x-intake-key: $LOGIC_INTAKE_KEY`.

The key is only in Vercel (project `logic-solar` → Settings → Environment
Variables → `LOGIC_INTAKE_KEY`, Production and Preview, marked Sensitive).
It is never committed, never in the URL, never sent to the browser. A new or
changed variable applies to new deployments only: redeploy after setting it.

## Body

Built by `buildIntakeBody` in `src/lib/lead-core.js`:

- `submission_id`: a UUID made in the browser on the first Submit and reused
  for every retry of that lead (the route's own retry and a visitor's second
  click alike).
- `first_name`, `last_name`, `email`, `phone` (as typed, e.g. `(316) 555-0142`),
  `address1`, `city`, `state`, `postal_code`.
- `monthly_bill`, `homeowner`, `shade`, `credit_score`: the labels exactly as
  shown (`$320` / `$600+`; `Yes, I own my home` / `No, I rent`; `No shade` …;
  `Yes` / `No` / `I'm not sure` to "Is your credit score above 640?").
- `contact_preference`: `text` or `call`.
- `consent`: `{agreed: true, text: <CONSENT_TEXT, the wording shown next to the
  box>, at: <ISO time the box was ticked>}`.
- `page_url`, and `utm_source` / `utm_medium` / `utm_campaign` / `utm_term` /
  `utm_content` / `gclid` / `fbclid` from the visitor's landing URL
  (`src/lib/attribution.ts`, kept for the visit). Missing ones are omitted.
- `test: true` only while `INTAKE_TEST_MODE` in `api/lead.js` is `true` (it
  is `false`: live since October 23, 2026, after Josh approved the flow).
  Logic answers test submissions with a `would` summary (logged) and saves
  nothing; the thank-you step then shows "Test submission · not saved".

## Answers

| Intake answers | Route does | Visitor sees |
| --- | --- | --- |
| 200 `{ok: true}` | — | thank-you step |
| 400 `{errors: {field: message}}` | maps the fields to the funnel's | the step with that question, message under the field |
| 404 | logs "wrong or missing key, or the endpoint is off" | "We couldn't send your request… call (816) 300-5781" |
| 429 / 5xx / network error | waits 2 s, retries once with the same body and `submission_id`; logs | thank-you if the retry works, else the call-us message |
| (no `LOGIC_INTAKE_KEY`) | logs, sends nothing | the call-us message |

Logs are in Vercel → logic-solar → Logs, prefixed `[lead]`.

## Status

Live on the homepage since October 23, 2026 (Josh approved the flow). The
/contact page still uses the GoHighLevel form.

Tests: `tests/lead.test.mjs` (`npm test`).

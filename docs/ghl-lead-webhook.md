# Homepage funnel → GoHighLevel (inbound webhook)

The homepage savings funnel (`src/components/SavingsFunnel.tsx`) posts each
lead to `/api/lead` (`api/lead.js`). That route checks the answers again and
forwards them to a GoHighLevel workflow's **Inbound Webhook** trigger. The
webhook URL is kept only in the Vercel environment variable
`GHL_LEAD_WEBHOOK_URL`, never in the page.

Until that variable is set, `/api/lead` answers `503 not_configured` and the
funnel tells the visitor to try again or call (816) 300-5781. **Do not ship
the funnel to production before a test lead has landed in GoHighLevel.**

## One-time setup in GoHighLevel (≈10 minutes)

1. **Custom fields** (Settings → Custom Fields → Contact). "Average Monthly
   Utility Bill ($)" already exists. Add:
   - Homeowner (single line)
   - Roof Shade (single line)
   - Credit Score Above 640 (single line)
   - Contact Preference (single line)
   - Consent Text (multi-line), Consent Date (single line), Consent IP (single line)
2. **Workflow** (Automation → Workflows → Create Workflow → Start from scratch).
   - Trigger: **Inbound Webhook**. Copy the URL it shows.
   - Send the URL to Compass. We set it in Vercel and send one test lead so
     GoHighLevel can see the fields, then press **Fetch sample requests** /
     pick that request in the trigger.
   - Action: **Create/Update Contact**, mapping from the webhook data
     (`inboundWebhookRequest.<key>`), using the keys below.
   - Recommended actions after it: add the tag `website lead`, create an
     opportunity in the solar pipeline, and notify the rep (SMS/email to the
     team) with `notes`, so `contact_preference` decides text vs. call.
   - Publish the workflow.
3. Tell Compass it is published; we submit a second test lead and check the
   contact before the funnel goes live.

Inbound Webhook is one of GoHighLevel's premium workflow triggers; the
account may need "Workflow Premium Triggers & Actions" turned on.

## Fields sent (JSON)

| Key | Example | Map to |
| --- | --- | --- |
| `first_name`, `last_name`, `full_name` | Pat, Smith | First / Last / Full Name |
| `email` | pat@example.com | Email |
| `phone` | +13165550142 | Phone |
| `address1`, `city`, `state`, `postal_code`, `country` | 123 Main St, Wichita, KS, 67202, US | Address fields |
| `average_monthly_utility_bill` | 320 | Average Monthly Utility Bill ($) |
| `homeowner` | Yes / No | Homeowner |
| `roof_shade` | No shade / A little shade / A lot of shade / Not sure | Roof Shade |
| `credit_score_above_640` | Yes / No / I'm not sure | Credit Score Above 640 |
| `contact_preference` | Text / Phone call | Contact Preference |
| `consent` | true | (always true; the form cannot be sent without it) |
| `consent_text` | the exact wording the visitor agreed to | Consent Text |
| `consent_at`, `consent_ip`, `consent_user_agent` | 2026-10-19T12:00:00.000Z, … | Consent Date / Consent IP |
| `notes` | one-line summary of every answer | contact note or the rep notification |
| `source` | Website - Homepage Savings Funnel | Contact Source |
| `page_url`, `submitted_at`, `tags` | | optional |

## Vercel

Project `logic-solar` → Settings → Environment Variables:
`GHL_LEAD_WEBHOOK_URL` = the Inbound Webhook URL, for **Production** and
**Preview**. Redeploy after adding it (a variable applies to new deployments only).

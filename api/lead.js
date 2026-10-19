// POST /api/lead: the homepage funnel's submit. Re-validates the lead and
// forwards it to GoHighLevel's inbound webhook, whose URL lives only in the
// Vercel environment (GHL_LEAD_WEBHOOK_URL), never in the page.
import { validateLead, buildLeadPayload } from '../src/lib/lead-core.js';

export async function handleLead(body, { webhookUrl, fetchImpl = fetch, now = () => new Date(), ip, userAgent } = {}) {
  if (!body || typeof body !== 'object') return { status: 400, json: { ok: false, error: 'bad_request' } };

  // Honeypot: a field people never see. Bots that fill it get a quiet success.
  if (typeof body.company === 'string' && body.company.trim()) return { status: 200, json: { ok: true } };

  const errors = validateLead(body);
  if (Object.keys(errors).length) return { status: 422, json: { ok: false, error: 'invalid', fields: errors } };

  if (!webhookUrl) return { status: 503, json: { ok: false, error: 'not_configured' } };

  const payload = buildLeadPayload(body, {
    submittedAt: now().toISOString(),
    pageUrl: typeof body.pageUrl === 'string' ? body.pageUrl.slice(0, 300) : '',
    ip,
    userAgent,
  });

  try {
    const res = await fetchImpl(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error('lead webhook answered', res.status);
      return { status: 502, json: { ok: false, error: 'upstream' } };
    }
  } catch (err) {
    console.error('lead webhook failed', err && err.name);
    return { status: 502, json: { ok: false, error: 'upstream' } };
  }
  return { status: 200, json: { ok: true } };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const forwarded = req.headers['x-forwarded-for'];
  const { status, json } = await handleLead(body, {
    webhookUrl: process.env.GHL_LEAD_WEBHOOK_URL,
    ip: typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '',
    userAgent: String(req.headers['user-agent'] || '').slice(0, 300),
  });
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(json);
}

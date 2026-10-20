// POST /api/lead: the homepage funnel's submit. Re-validates the lead and
// sends it, server-side only, to Logic's intake endpoint with the key from
// LOGIC_INTAKE_KEY (docs/lead-intake.md). The key never reaches the browser.
import { validateLead, buildIntakeBody, INTAKE_FIELD_TO_LEAD } from '../src/lib/lead-core.js';

export const INTAKE_URL = 'https://logic-portal.com/api/lead-intake/site';

// Logic asked for "test": true until they say the endpoint takes real leads.
// Test submissions are answered with a summary and nothing is saved.
// Going live = set this to false in a reviewed commit.
export const INTAKE_TEST_MODE = true;

export const config = { maxDuration: 30 };

const ATTEMPT_TIMEOUT_MS = 8000;
const RETRY_DELAY_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function post(fetchImpl, key, body) {
  try {
    const res = await fetchImpl(INTAKE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-intake-key': key },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
    });
    let json = null;
    try { json = await res.json(); } catch { json = null; }
    return { status: res.status, json };
  } catch (err) {
    return { status: 0, json: null, error: err && err.name };
  }
}

const retryable = (status) => status === 0 || status === 429 || status >= 500;

export async function handleLead(body, { key, fetchImpl = fetch, wait = sleep, log = console, test = INTAKE_TEST_MODE } = {}) {
  if (!body || typeof body !== 'object') return { status: 400, json: { ok: false, error: 'bad_request' } };

  // Honeypot: a field people never see. Bots that fill it get a quiet success.
  if (typeof body.company === 'string' && body.company.trim()) return { status: 200, json: { ok: true } };

  const errors = validateLead(body);
  if (Object.keys(errors).length) return { status: 400, json: { ok: false, errors } };

  if (!key) {
    log.error('[lead] LOGIC_INTAKE_KEY is not set; lead not sent', { submission_id: body.submissionId });
    return { status: 503, json: { ok: false, error: 'unavailable' } };
  }

  const intakeBody = buildIntakeBody(body, { test });
  let answer = await post(fetchImpl, key, intakeBody);
  if (retryable(answer.status)) {
    log.warn('[lead] intake answered', answer.status || answer.error, '- retrying once', { submission_id: intakeBody.submission_id });
    await wait(RETRY_DELAY_MS);
    answer = await post(fetchImpl, key, intakeBody); // same body, same submission_id
  }

  if (answer.status === 200 && answer.json && answer.json.ok === true) {
    if (test) log.info('[lead] test submission accepted', { submission_id: intakeBody.submission_id, would: answer.json.would });
    return { status: 200, json: { ok: true, test } };
  }

  if (answer.status === 400) {
    const fields = {};
    const theirs = (answer.json && answer.json.errors) || {};
    for (const [field, message] of Object.entries(theirs)) {
      fields[INTAKE_FIELD_TO_LEAD[field] || field] = typeof message === 'string' ? message : 'Please check this answer.';
    }
    log.warn('[lead] intake refused fields', Object.keys(theirs), { submission_id: intakeBody.submission_id });
    return { status: 400, json: { ok: false, errors: fields } };
  }

  if (answer.status === 404) {
    log.error('[lead] intake answered 404: wrong or missing key, or the endpoint is off', { submission_id: intakeBody.submission_id });
  } else {
    log.error('[lead] intake failed', answer.status || answer.error, { submission_id: intakeBody.submission_id });
  }
  return { status: 502, json: { ok: false, error: 'unavailable' } };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  // Trimmed: a key pasted into Vercel easily picks up a space or line break.
  const { status, json } = await handleLead(body, { key: (process.env.LOGIC_INTAKE_KEY || '').trim() });
  return res.status(status).json(json);
}

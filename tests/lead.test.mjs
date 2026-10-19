// The homepage funnel's lead: validation, the GoHighLevel payload, and the
// /api/lead route's answers (with a fake webhook).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLead, buildLeadPayload, formatPhone, CONSENT_TEXT } from '../src/lib/lead-core.js';
import { handleLead } from '../api/lead.js';

const lead = (over = {}) => ({
  monthlyBill: 320, zip: '67202', homeowner: 'Yes, I own my home', shade: 'No shade', credit: 'Yes',
  street: '123 Main St', city: 'Wichita', state: 'KS', firstName: 'Pat', lastName: 'Smith',
  phone: '(316) 555-0142', email: 'Pat@Example.com', contactPreference: 'Text', consent: true, ...over,
});

const okFetch = () => {
  const calls = [];
  const fetchImpl = async (url, init) => { calls.push({ url, init }); return { ok: true, status: 200 }; };
  return { calls, fetchImpl };
};

test('a complete lead is valid', () => {
  assert.deepEqual(validateLead(lead()), {});
});

test('each missing answer is reported on its own field', () => {
  const errors = validateLead(lead({ zip: '672', credit: '', state: 'XX', phone: '555-0142', email: 'pat@', contactPreference: '', consent: false }));
  assert.deepEqual(Object.keys(errors).sort(), ['consent', 'contactPreference', 'credit', 'email', 'phone', 'state', 'zip']);
});

test('a step validates only its own fields', () => {
  assert.deepEqual(validateLead({ zip: '67202' }, ['zip']), {});
  assert.ok(validateLead({ street: '', city: 'Wichita', state: 'KS', zip: '67202' }, ['street', 'city', 'state', 'zip']).street);
});

test('consent must be exactly true, not a truthy string', () => {
  assert.ok(validateLead(lead({ consent: 'true' })).consent);
});

test('phone numbers format while typing and accept a leading 1', () => {
  assert.equal(formatPhone('3165550142'), '(316) 555-0142');
  assert.equal(formatPhone('316'), '316');
  assert.equal(formatPhone('31655'), '(316) 55');
  assert.deepEqual(validateLead(lead({ phone: '+1 316 555 0142' }), ['phone']), {});
  assert.ok(validateLead(lead({ phone: '(116) 555-0142' }), ['phone']).phone);
});

test('the payload carries every answer under the keys the GoHighLevel workflow maps', () => {
  const p = buildLeadPayload(lead(), { submittedAt: '2026-10-19T12:00:00.000Z', pageUrl: 'https://www.logic-solar.com/', ip: '1.2.3.4', userAgent: 'UA' });
  assert.equal(p.first_name, 'Pat');
  assert.equal(p.full_name, 'Pat Smith');
  assert.equal(p.email, 'pat@example.com');
  assert.equal(p.phone, '+13165550142');
  assert.equal(p.address1, '123 Main St');
  assert.equal(p.city, 'Wichita');
  assert.equal(p.state, 'KS');
  assert.equal(p.postal_code, '67202');
  assert.equal(p.average_monthly_utility_bill, 320);
  assert.equal(p.homeowner, 'Yes');
  assert.equal(p.roof_shade, 'No shade');
  assert.equal(p.credit_score_above_640, 'Yes');
  assert.equal(p.contact_preference, 'Text');
  assert.equal(p.consent, true);
  assert.equal(p.consent_text, CONSENT_TEXT);
  assert.equal(p.consent_at, '2026-10-19T12:00:00.000Z');
  assert.equal(p.consent_ip, '1.2.3.4');
  assert.match(p.notes, /Credit score above 640: Yes\. Prefers: Text\./);
});

test('the consent text names Logic Solar, not a placeholder', () => {
  assert.match(CONSENT_TEXT, /contacted by Logic Solar via phone calls and text messages/);
  assert.doesNotMatch(CONSENT_TEXT, /\[Company Name\]/);
});

test('route: a valid lead is forwarded to the webhook once', async () => {
  const { calls, fetchImpl } = okFetch();
  const r = await handleLead(lead(), { webhookUrl: 'https://hooks.example/abc', fetchImpl, now: () => new Date('2026-10-19T12:00:00Z') });
  assert.equal(r.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://hooks.example/abc');
  const sent = JSON.parse(calls[0].init.body);
  assert.equal(sent.phone, '+13165550142');
  assert.equal(sent.submitted_at, '2026-10-19T12:00:00.000Z');
});

test('route: an invalid lead is refused with its field errors and nothing is sent', async () => {
  const { calls, fetchImpl } = okFetch();
  const r = await handleLead(lead({ email: 'nope' }), { webhookUrl: 'https://hooks.example/abc', fetchImpl });
  assert.equal(r.status, 422);
  assert.ok(r.json.fields.email);
  assert.equal(calls.length, 0);
});

test('route: the honeypot answers success and sends nothing', async () => {
  const { calls, fetchImpl } = okFetch();
  const r = await handleLead(lead({ company: 'Spam Inc' }), { webhookUrl: 'https://hooks.example/abc', fetchImpl });
  assert.equal(r.status, 200);
  assert.equal(calls.length, 0);
});

test('route: without a webhook URL it answers 503 rather than dropping the lead silently', async () => {
  const r = await handleLead(lead(), { webhookUrl: '' });
  assert.equal(r.status, 503);
  assert.equal(r.json.error, 'not_configured');
});

test('route: a webhook failure is reported, so the visitor sees the error and the phone number', async () => {
  const failing = await handleLead(lead(), { webhookUrl: 'https://hooks.example/abc', fetchImpl: async () => ({ ok: false, status: 500 }) });
  assert.equal(failing.status, 502);
  const throwing = await handleLead(lead(), { webhookUrl: 'https://hooks.example/abc', fetchImpl: async () => { throw new Error('network'); } });
  assert.equal(throwing.status, 502);
});

test('route: a missing body is a bad request', async () => {
  assert.equal((await handleLead(null, { webhookUrl: 'x' })).status, 400);
});

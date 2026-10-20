// The homepage funnel's lead: validation, Logic's intake body, and the
// /api/lead route's handling of every intake answer (with a fake endpoint).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLead, buildIntakeBody, formatPhone, CONSENT_TEXT } from '../src/lib/lead-core.js';
import { handleLead, INTAKE_URL, INTAKE_TEST_MODE, cleanKey, keyFingerprint } from '../api/lead.js';

const ID = '3f2b8c1e-9d4a-4c6b-8e2f-1a2b3c4d5e6f';

const lead = (over = {}) => ({
  submissionId: ID, monthlyBill: 320, monthlyBillLabel: '$320', zip: '67202', homeowner: 'Yes, I own my home',
  shade: 'No shade', credit: 'Yes', street: '123 Main St', city: 'Wichita', state: 'KS', firstName: 'Pat',
  lastName: 'Smith', phone: '(316) 555-0142', email: 'Pat@Example.com', contactPreference: 'Text', consent: true,
  consentAt: '2026-10-20T15:04:05.000Z', pageUrl: 'https://www.logic-solar.com/?utm_source=google',
  attribution: { utm_source: 'google', gclid: 'abc123' }, ...over,
});

// A fake intake that answers with the given statuses in order.
const intake = (...answers) => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    const [status, json] = answers[Math.min(calls.length - 1, answers.length - 1)];
    if (status === 'throw') throw Object.assign(new Error('network'), { name: 'TypeError' });
    return { status, ok: status >= 200 && status < 300, json: async () => json };
  };
  return { calls, fetchImpl };
};

const quiet = { info() {}, warn() {}, error() {} };
const recorder = () => {
  const lines = [];
  return { lines, info: (...a) => lines.push(['info', a]), warn: (...a) => lines.push(['warn', a]), error: (...a) => lines.push(['error', a]) };
};
const run = (body, fake, over = {}) =>
  handleLead(body, { key: 'k-test', fetchImpl: fake.fetchImpl, wait: async () => {}, log: quiet, ...over });

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

test('consent must be exactly true and carry the time the box was ticked', () => {
  assert.ok(validateLead(lead({ consent: 'true' })).consent);
  assert.ok(validateLead(lead({ consentAt: '' })).consent);
});

test('the submission id must be a UUID', () => {
  assert.ok(validateLead(lead({ submissionId: 'abc' })).submissionId);
});

test('phone numbers format while typing and accept a leading 1', () => {
  assert.equal(formatPhone('3165550142'), '(316) 555-0142');
  assert.equal(formatPhone('31655'), '(316) 55');
  assert.deepEqual(validateLead(lead({ phone: '+1 316 555 0142' }), ['phone']), {});
  assert.ok(validateLead(lead({ phone: '(116) 555-0142' }), ['phone']).phone);
});

test("the intake body follows Logic's spec, labels exactly as shown", () => {
  const b = buildIntakeBody(lead(), { test: true });
  assert.deepEqual(b, {
    submission_id: ID,
    first_name: 'Pat', last_name: 'Smith', email: 'pat@example.com', phone: '(316) 555-0142',
    address1: '123 Main St', city: 'Wichita', state: 'KS', postal_code: '67202',
    monthly_bill: '$320', homeowner: 'Yes, I own my home', shade: 'No shade', credit_score: 'Yes',
    contact_preference: 'text',
    consent: { agreed: true, text: CONSENT_TEXT, at: '2026-10-20T15:04:05.000Z' },
    page_url: 'https://www.logic-solar.com/?utm_source=google',
    utm_source: 'google', gclid: 'abc123',
    test: true,
  });
});

test('"Phone call" is sent as "call"; optional fields we lack are left out; test is omitted when live', () => {
  const b = buildIntakeBody(lead({ contactPreference: 'Phone call', attribution: {}, pageUrl: '' }), { test: false });
  assert.equal(b.contact_preference, 'call');
  for (const key of ['utm_source', 'gclid', 'page_url', 'test']) assert.ok(!(key in b), key);
});

test('the consent text names Logic Solar, not a placeholder', () => {
  assert.match(CONSENT_TEXT, /contacted by Logic Solar via phone calls and text messages/);
  assert.doesNotMatch(CONSENT_TEXT, /\[Company Name\]/);
});

test('the route stays in test mode until Logic says the endpoint takes real leads', () => {
  assert.equal(INTAKE_TEST_MODE, true);
});

test('200: posts once to the intake with the key header and answers ok', async () => {
  const fake = intake([200, { ok: true, would: { action: 'create' } }]);
  const r = await run(lead(), fake);
  assert.deepEqual(r, { status: 200, json: { ok: true, test: true } });
  assert.equal(fake.calls.length, 1);
  assert.equal(fake.calls[0].url, INTAKE_URL);
  assert.equal(fake.calls[0].init.method, 'POST');
  assert.equal(fake.calls[0].init.headers['Content-Type'], 'application/json');
  assert.equal(fake.calls[0].init.headers['x-intake-key'], 'k-test');
  assert.ok(!fake.calls[0].url.includes('k-test'), 'the key is never in the URL');
  assert.ok(!JSON.stringify(fake.calls[0].body).includes('k-test'), 'the key is never in the body');
  assert.equal(fake.calls[0].body.test, true);
});

test('400: the intake field errors come back under the funnel field names', async () => {
  const fake = intake([400, { ok: false, errors: { postal_code: 'ZIP is outside our service area', phone: 'Invalid phone' } }]);
  const r = await run(lead(), fake);
  assert.equal(r.status, 400);
  assert.deepEqual(r.json.errors, { zip: 'ZIP is outside our service area', phone: 'Invalid phone' });
  assert.equal(fake.calls.length, 1);
});

test('404: logged server-side, not retried, generic error to the visitor', async () => {
  const fake = intake([404, null]);
  const log = recorder();
  const r = await run(lead(), fake, { log });
  assert.deepEqual(r, { status: 502, json: { ok: false, error: 'unavailable' } });
  assert.equal(fake.calls.length, 1);
  assert.ok(log.lines.some(([level, a]) => level === 'error' && String(a[0]).includes('404')));
});

for (const first of [429, 500, 503, 'throw']) {
  test(`${first}: retried once after 2 seconds with the same submission_id`, async () => {
    const fake = intake([first, null], [200, { ok: true }]);
    const waits = [];
    const r = await run(lead(), fake, { wait: async (ms) => { waits.push(ms); } });
    assert.equal(r.status, 200);
    assert.deepEqual(waits, [2000]);
    assert.equal(fake.calls.length, 2);
    assert.equal(fake.calls[0].body.submission_id, ID);
    assert.equal(fake.calls[1].body.submission_id, ID);
    assert.deepEqual(fake.calls[0].body, fake.calls[1].body);
  });
}

test('a second failure is logged and the visitor gets the generic error (no third try)', async () => {
  const fake = intake([500, null], [502, null]);
  const log = recorder();
  const r = await run(lead(), fake, { log });
  assert.deepEqual(r, { status: 502, json: { ok: false, error: 'unavailable' } });
  assert.equal(fake.calls.length, 2);
  assert.ok(log.lines.some(([level]) => level === 'error'));
});

test('our own validation refuses a bad lead before anything is sent', async () => {
  const fake = intake([200, { ok: true }]);
  const r = await run(lead({ email: 'nope' }), fake);
  assert.equal(r.status, 400);
  assert.ok(r.json.errors.email);
  assert.equal(fake.calls.length, 0);
});

test('the honeypot answers success and sends nothing', async () => {
  const fake = intake([200, { ok: true }]);
  const r = await run(lead({ company: 'Spam Inc' }), fake);
  assert.equal(r.status, 200);
  assert.equal(fake.calls.length, 0);
});

test('without LOGIC_INTAKE_KEY nothing is sent and it is logged', async () => {
  const fake = intake([200, { ok: true }]);
  const log = recorder();
  const r = await run(lead(), fake, { key: '', log });
  assert.equal(r.status, 503);
  assert.equal(fake.calls.length, 0);
  assert.ok(log.lines.some(([level]) => level === 'error'));
});

test('a missing body is a bad request', async () => {
  assert.equal((await handleLead(null, { key: 'k' })).status, 400);
});

test('the key loses copy-paste debris (spaces, line breaks, wrapping quotes) and nothing else', () => {
  assert.equal(cleanKey('  abc-123_@.x \n'), 'abc-123_@.x');
  assert.equal(cleanKey('"abc-123"'), 'abc-123');
  assert.equal(cleanKey("'abc-123'\n"), 'abc-123');
  assert.equal(cleanKey('\u201cabc-123\u201d'), 'abc-123');
  assert.equal(cleanKey('ab"c'), 'ab"c');
  assert.equal(cleanKey(undefined), '');
});

test('a 404 logs a key fingerprint (length + short hash), never the key', async () => {
  const fake = intake([404, null]);
  const log = recorder();
  await run(lead(), fake, { key: 'secret-key-value', log });
  const logged = JSON.stringify(log.lines);
  assert.ok(!logged.includes('secret-key-value'));
  assert.ok(logged.includes(keyFingerprint('secret-key-value').sha256_prefix));
  assert.equal(keyFingerprint('secret-key-value').length, 16);
});

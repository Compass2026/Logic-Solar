// The homepage funnel's lead: the one set of rules the browser, the /api/lead
// route and the tests share. The route re-validates everything the browser
// sends and builds the body Logic's intake endpoint receives
// (docs/lead-intake.md).

export const CONSENT_TEXT =
  'By submitting your information, you agree to be contacted by Logic Solar via phone calls and text messages at the number provided. ' +
  'You understand that these communications may include automated technology, pre-recorded messages, and/or artificial intelligence (AI)-generated voice calls, ' +
  'and may be used for marketing and informational purposes related to our products and services. Consent is not a condition of purchase. ' +
  'You may opt out at any time by replying STOP to text messages or requesting to be placed on our Do Not Call list. Message and data rates may apply.';

export const HOMEOWNER_OPTIONS = ['Yes, I own my home', 'No, I rent'];
export const SHADE_OPTIONS = ['No shade', 'A little shade', 'A lot of shade', 'Not sure'];
export const CREDIT_OPTIONS = ['Yes', 'No', "I'm not sure"];
export const CONTACT_OPTIONS = ['Text', 'Phone call'];

export const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD',
  'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const str = (v) => (typeof v === 'string' ? v.trim() : '');

export const phoneDigits = (v) => {
  const d = str(v).replace(/\D/g, '');
  return d.length === 11 && d.startsWith('1') ? d.slice(1) : d;
};

export const formatPhone = (v) => {
  const d = phoneDigits(v).slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export const isZip = (v) => /^\d{5}$/.test(str(v));
export const isPhone = (v) => /^[2-9]\d{2}[2-9]\d{6}$/.test(phoneDigits(v));
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str(v));

// Field-level errors for one step's fields, or for the whole lead.
export function validateLead(lead, fields = null) {
  const want = (f) => !fields || fields.includes(f);
  const errors = {};
  const bill = Number(lead.monthlyBill);
  if (want('monthlyBill') && !(Number.isFinite(bill) && bill >= 0 && bill <= 10000)) errors.monthlyBill = 'Choose your monthly bill.';
  if (want('zip') && !isZip(lead.zip)) errors.zip = 'Enter a 5-digit ZIP code.';
  if (want('homeowner') && !HOMEOWNER_OPTIONS.includes(lead.homeowner)) errors.homeowner = 'Choose an answer.';
  if (want('shade') && !SHADE_OPTIONS.includes(lead.shade)) errors.shade = 'Choose an answer.';
  if (want('credit') && !CREDIT_OPTIONS.includes(lead.credit)) errors.credit = 'Choose an answer.';
  if (want('street') && str(lead.street).length < 3) errors.street = 'Enter your street address.';
  if (want('city') && str(lead.city).length < 2) errors.city = 'Enter your city.';
  if (want('state') && !US_STATES.includes(str(lead.state).toUpperCase())) errors.state = 'Choose your state.';
  if (want('firstName') && !str(lead.firstName)) errors.firstName = 'Enter your first name.';
  if (want('lastName') && !str(lead.lastName)) errors.lastName = 'Enter your last name.';
  if (want('phone') && !isPhone(lead.phone)) errors.phone = 'Enter a 10-digit phone number.';
  if (want('email') && !isEmail(lead.email)) errors.email = 'Enter a valid email address.';
  if (want('contactPreference') && !CONTACT_OPTIONS.includes(lead.contactPreference)) errors.contactPreference = 'Choose text or phone call.';
  if (want('consent') && lead.consent !== true) errors.consent = 'Please check the box so we can contact you.';
  if (want('consentAt') && lead.consent === true && Number.isNaN(Date.parse(str(lead.consentAt)))) errors.consent = 'Please check the box so we can contact you.';
  if (want('submissionId') && !UUID_RE.test(str(lead.submissionId))) errors.submissionId = 'Please refresh the page and try again.';
  for (const key of ['street', 'city', 'firstName', 'lastName', 'email']) {
    if (want(key) && str(lead[key]).length > 120) errors[key] = 'That answer is too long.';
  }
  return errors;
}

// Logic's intake body. Labels go exactly as the visitor saw them; optional
// fields we don't have are left out.
export function buildIntakeBody(lead, { test = true } = {}) {
  const body = {
    submission_id: str(lead.submissionId),
    first_name: str(lead.firstName),
    last_name: str(lead.lastName),
    email: str(lead.email).toLowerCase(),
    phone: str(lead.phone),
    address1: str(lead.street),
    city: str(lead.city),
    state: str(lead.state).toUpperCase(),
    postal_code: str(lead.zip),
    monthly_bill: str(lead.monthlyBillLabel),
    homeowner: str(lead.homeowner),
    shade: str(lead.shade),
    credit_score: str(lead.credit),
    contact_preference: lead.contactPreference === 'Text' ? 'text' : lead.contactPreference === 'Phone call' ? 'call' : '',
    consent: { agreed: true, text: CONSENT_TEXT, at: new Date(lead.consentAt).toISOString() },
    page_url: str(lead.pageUrl).slice(0, 500),
  };
  const attribution = lead.attribution && typeof lead.attribution === 'object' ? lead.attribution : {};
  for (const key of ATTRIBUTION_KEYS) body[key] = str(attribution[key]).slice(0, 300);
  for (const [key, value] of Object.entries(body)) if (value === '') delete body[key];
  if (test) body.test = true;
  return body;
}

// Logic's 400 names its fields; the funnel names them its own way.
export const INTAKE_FIELD_TO_LEAD = {
  first_name: 'firstName', last_name: 'lastName', email: 'email', phone: 'phone',
  address1: 'street', city: 'city', state: 'state', postal_code: 'zip',
  monthly_bill: 'monthlyBill', homeowner: 'homeowner', shade: 'shade', credit_score: 'credit',
  contact_preference: 'contactPreference', consent: 'consent',
};

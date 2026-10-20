import { ATTRIBUTION_KEYS } from './lead-core.js';

// Ad click and campaign codes from the URL the visitor landed on, kept for the
// visit so a lead sent from the homepage funnel carries them even if the
// visitor arrived on another page first.
const STORAGE_KEY = 'logic_attribution';

export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 300);
    }
    if (Object.keys(found).length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Storage can be blocked (private mode); attribution is then just omitted.
  }
}

export function readAttribution(): Record<string, string> {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
    return stored && typeof stored === 'object' ? stored : {};
  } catch {
    return {};
  }
}

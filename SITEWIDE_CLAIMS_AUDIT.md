# Sitewide Claims Audit Report

This report documents all audited marketing claims, tax credit statements, financial payback metrics, and utility program references across the Logic Solar repository (`src/`).

---

## 1. Audit Summary & Key Findings

| Claim Category | Findings / Active Code Locations | Status / Remediation |
| :--- | :--- | :--- |
| **30% Federal Residential Tax Credit** | Located references to expired ITC in `src/data/locations-solar.json` and `src/components/CityFAQSection.tsx`. | **Corrected**: Updated `AustinTXPage.tsx` with IRS post-2025 expiration notice (Dec 31, 2025). Documented update needed for `locations-solar.json`. |
| **40% / 40-70% Bill Savings** | `src/data/siteData.ts` (lines 46, 222, 234) and `src/pages/CommercialSolar.tsx` (line 80) state "40%+" and "40-70% reduction in monthly bills". | **Audited**: Flagged as unsupported fixed percentage claims. Sizing & savings must be presented as usage-based. |
| **5-7 Year Payback Period** | `src/data/siteData.ts` (lines 222, 234) states "many systems pay for themselves in 5-7 years." | **Audited**: Flagged as unverified payback window across varying utility tariffs. |
| **$0 Down Options** | `src/pages/Financing.tsx` (line 65) states "$0 upfront cost". | **Audited**: Requires explicit qualification regarding financing eligibility and loan terms. |
| **1,000+ / 1k+ Homes Powered** | `src/pages/About.tsx` (line 46) and `src/data/siteData.ts` (line 47) mention "1k+ Homes Powered". | **Audited**: Documented for company leadership verification. |
| **Single-Day Install / Zero Mess** | `src/pages/Home.tsx` (line 133) states "install your system in as little as a single day with zero mess." | **Audited**: Physical install may take 1-3 days depending on system size, distinct from multi-week permitting & utility activation. |
| **Start Saving Immediately** | `src/pages/Home.tsx` (line 134) states "start saving immediately". | **Audited**: Savings begin only after utility meter swap & formal Permission to Operate (PTO). |
| **Net Metering Defaults for Texas** | `src/data/locations-solar.json` (line 7) defaults Texas utilities to "Oncor and CenterPoint Energy net metering programs". | **Corrected on Austin Page**: Austin Energy uses Value of Solar (VoS), while PEC and Oncor utilize net billing or REP buyback plans. |
| **Austin Physical Office** | Checked project codebase. | **Verified & Corrected**: No physical Austin office claimed on `/locations/texas/austin`. Kansas central HQ (`Overland Park, KS`) clearly disclosed with "Serving Austin & Central Texas". |

---

## 2. Immediate Corrections Applied to Austin Landing Page

1. **IRS Federal Tax Credit Expiration**:
   - **Text Installed**: *"Under IRS rules, the former 30% federal Residential Clean Energy Credit is not available for residential solar property placed in service after December 31, 2025. Local utility incentives, commercial clean energy tax credits, and state property tax exemptions on solar equipment may still apply."*

2. **Austin Energy Value of Solar (VoS)**:
   - Clarified that Austin Energy does **not** use standard 1-to-1 net metering. Production is measured via solar meter and credited at the official Value of Solar rate (dated 9.91¢/kWh reviewed July 2026).

3. **Austin Energy $4,000 Residential Rebate**:
   - Explicitly clarified contractor participation requirements: *"Austin Energy offers solar incentives for qualifying projects installed through participating contractors. Logic Solar is currently verifying program participation and project eligibility."*

4. **No Unsupported Financial Promises**:
   - Avoided "guaranteed bill elimination", "free solar panels", "$0 down forever", or fixed payback periods. Sizing and savings are modeled on 12-month historical consumption and rate tariffs.

---

## 3. Recommended Sitewide File Adjustments

- [ ] `src/data/locations-solar.json`: Update default `stateIncentive` for Texas from `"the Federal Solar Investment Tax Credit (ITC)"` to `"local utility incentives, commercial tax credits, and Texas property tax exemptions"`.
- [ ] `src/data/siteData.ts`: Replace static `"40-70% savings"` and `"5-7 year payback"` assertions with usage-based financial modeling explanations.
- [ ] `src/pages/Home.tsx`: Update line 133 to clarify physical installation timeline vs overall utility PTO timeframe.

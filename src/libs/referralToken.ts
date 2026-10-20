// Dolphin Rewards referral links: a shared link sends the friend here as ?rt=<token>. Keep it in this browser
// (60 days, like the rewards app) so the Odoo sales order can carry it, wherever on the site they check out.
// The token is signed by the rewards app; a copied, typed or invented one is worthless, so nothing else is checked here.
const KEY = "dolphin_rt";
const DAYS = 60;
export const REFERRAL_TOKEN_RE = /^[A-Za-z0-9_-]{10,64}\.[0-9a-f]{32}$/;

export function captureReferralToken() {
  try {
    const rt = new URLSearchParams(window.location.search).get("rt");
    if (rt && REFERRAL_TOKEN_RE.test(rt)) {
      localStorage.setItem(KEY, JSON.stringify({ rt, exp: Date.now() + DAYS * 864e5 }));
    }
  } catch {
    /* private mode: the referral just isn't kept */
  }
}

export function getReferralToken(): string | undefined {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved && saved.exp > Date.now() && REFERRAL_TOKEN_RE.test(saved.rt)) return saved.rt;
  } catch {
    /* nothing saved */
  }
  return undefined;
}

import Axios from "@/src/libs/Axios";

// Dolphin Rewards referral links. A friend arrives with either
//   ?ref=CODE (&source=qr)  the short link / QR code people share: the se server swaps the code for a token
//   ?rt=<token>          the older long link, already carrying the token
// Keep the token in this browser (60 days, like the rewards app) so the Odoo sales order can carry it, wherever on
// the site they check out. The token is signed by the rewards app; a copied, typed or invented one is worthless.
const KEY = "dolphin_rt";
const DAYS = 60;
export const REFERRAL_TOKEN_RE = /^[A-Za-z0-9_-]{10,64}\.[0-9a-f]{32}$/;
const CODE_RE = /^[A-Za-z0-9]{3,20}$/;

function save(rt: string) {
  localStorage.setItem(KEY, JSON.stringify({ rt, exp: Date.now() + DAYS * 864e5 }));
}

// Tidy the address bar: the referral bits aren't needed once saved (other parameters stay).
function dropFromUrl(params: URLSearchParams) {
  ["rt", "ref", "source", "reward"].forEach((p) => params.delete(p));
  const q = params.toString();
  window.history.replaceState(null, "", window.location.pathname + (q ? `?${q}` : "") + window.location.hash);
}

export async function captureReferralToken() {
  try {
    const params = new URLSearchParams(window.location.search);
    const rt = params.get("rt");
    const ref = params.get("ref");
    if (rt && REFERRAL_TOKEN_RE.test(rt)) {
      save(rt);
      dropFromUrl(params);
    } else if (ref && CODE_RE.test(ref)) {
      const source = params.get("source") === "qr" ? "qr" : "link";
      dropFromUrl(params);
      const res = await Axios.post("/apis/referral-code", { code: ref, source });
      if (res.data?.rt && REFERRAL_TOKEN_RE.test(res.data.rt)) save(res.data.rt);
    }
  } catch {
    /* private mode, an unknown code or the rewards app is down: the sign-up just goes ahead without a referral */
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

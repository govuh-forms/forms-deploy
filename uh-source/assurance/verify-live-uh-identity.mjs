#!/usr/bin/env node
// GOV.UH Forms deployed visual identity contract. Run against real HTTPS
// after a release, and include every new product's relevant public URL.
import { createHash } from "node:crypto";

const LOGO = "https://www.gov.uhrblx.com/uh-brand/gov-uh-site-identity-logo.svg";
const ARMS = "https://www.gov.uhrblx.com/uh-brand/uh-government-coat-of-arms.webp";
const ARMS_SHA256 = "66cd5d449026855d0eb6308e1f62787be6cf90748b22da3194b22d5734de5644";
const defaultUrls = [
  "https://forms.service.gov.uhrblx.com/support",
  "https://admin.forms.service.gov.uhrblx.com/sign-in",
];
const urls = process.argv.slice(2).length ? process.argv.slice(2) : defaultUrls;
const errors = [];
const check = (ok, message) => { if (!ok) throw new Error(message); };
async function fetchOk(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(12000), redirect: "follow" });
  check(r.ok, url + ": HTTP " + r.status);
  return r;
}

try {
  const image = await fetchOk(ARMS);
  check(image.headers.get("content-type")?.includes("image/webp"), "UH government arms are not WebP");
  const digest = createHash("sha256").update(Buffer.from(await image.arrayBuffer())).digest("hex");
  check(digest === ARMS_SHA256, "Approved arms digest mismatch: " + digest);
  const logo = await fetchOk(LOGO);
  check(logo.headers.get("content-type")?.includes("svg"), "Government logo is not SVG");
  console.log("APPROVED_UH_ARTWORK_OK " + digest);
} catch (e) {
  errors.push(e.message);
}
for (const url of urls) {
  try {
    const html = await (await fetchOk(url)).text();
    check(html.includes("gov-uh-site-identity-logo.svg"), url + ": authoritative logo absent");
    const cssPaths = [...html.matchAll(/href=["']([^"']+\.css)(?:\?[^"']*)?["']/g)].map(x => x[1]);
    check(cssPaths.length > 0, url + ": no application stylesheet");
    const css = (await Promise.all(cssPaths.map(async x => (await fetchOk(new URL(x, url))).text()))).join("\n");
    // GOV.UK Frontend places the government logo and service product name
    // together in one header link. Require the reviewed service-specific
    // flex layout and gap, not a coincidental string elsewhere in a bundle.
    const headerAligned = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].some((match) =>
      match[1].includes("govuk-header__homepage-link") &&
      match[1].includes("govuk-header__logo") &&
      /display\s*:\s*inline-flex/.test(match[2]) &&
      /align-items\s*:\s*center/.test(match[2]) &&
      /column-gap\s*:\s*24px/.test(match[2])
    );
    check(headerAligned, url + ": GOV.UH logo and Forms product name are not aligned in the native header");
    const p = css.lastIndexOf("uh-government-coat-of-arms.webp");
    check(p >= 0, url + ": UH government arms absent from compiled CSS");
    const around = css.slice(Math.max(0, p - 200), p + 500);
    check(/(?:-webkit-)?mask\s*:\s*none/.test(around), url + ": inherited UK Royal Arms mask not disabled");
    if (new URL(url).pathname === "/support" && new URL(url).hostname.startsWith("forms.")) {
      check(html.includes("Manage forms"), url + ": expected Manage forms navigation");
    }
    console.log("SERVICE_IDENTITY_PASS " + url);
  } catch (e) {
    console.error("SERVICE_IDENTITY_FAIL " + url + ": " + e.message);
    errors.push(e.message);
  }
}
if (errors.length) {
  console.error("GOVUH_FORMS_IDENTITY_ACCEPTANCE_FAILED issues=" + errors.length);
  process.exitCode = 1;
} else {
  console.log("GOVUH_FORMS_IDENTITY_ACCEPTANCE_PASSED");
}

# GOV.UH Forms product page — source and deployment

**Application source:** [govuh-forms/forms-product-page](https://github.com/govuh-forms/forms-product-page), the UH fork of the native [govuk-forms/forms-product-page](https://github.com/govuk-forms/forms-product-page) Rails product. The original upstream commit history and GOV.UK Frontend architecture are retained. This deployment repository is not a competing application codebase.

## Current production release — 9 October 2026

The UH public product-page source was accepted and merged in [pull request #1](https://github.com/govuh-forms/forms-product-page/pull/1) following green GitHub Actions Tests and Build image checks. The merged `main` revision was built and published on the authorised VPS through the existing Docker/Caddy application runtime, with the old production container retained as a rollback.

| Record | Authoritative value |
| --- | --- |
| Upstream UK base | `806fc5bf1c363f25d77f0d0f6e3bb4a412df723d` |
| UH GitHub `main` release | `3b6efa43284641605fb4aa7dc0c4d1eecc96df38` |
| Release source tree | `84db608d0983401e2b4390d8c4b3d51db77f2c59` |
| Immutable Docker image digest | `sha256:bc78720ca26e1a403806a9a6042a563c9f05db7992976c9e26d18e927f3e82a1` |
| Public service | `https://forms.service.gov.uhrblx.com/` |
| Product container | `govuh-forms-product-page-main-3b6efa43` |
| Canonical Caddy backend | `127.0.0.1:5965` |
| GitHub Tests run | `37864352503` — passed |
| GitHub Build image run | `37864352531` — passed |
| Machine-readable production receipt | `/var/lib/uhde/production/app-releases/forms-product-page.json` |
| Rollback configuration | `/etc/caddy/uhde-backups/forms-service.pre-main-3b6efa43-20261009.caddy` |
| Rollback container | `govuh-forms-product-page-homepage-20261009`, still available on port `5904` |

The production receipt states `deployment_complete=true` for **this product-page release only**. The following canonical HTTPS routes returned HTTP 200 after cutover: `/`, `/get-started`, `/about`, `/support`, both staff Support routes, `/privacy`, `/accessibility`, `/cookies` and `/up`. The separate Forms Admin and Forms Runner endpoints also remained accessible.

The header's 162-pixel institutional wordmark, 7-pixel product-name spacing and 3-pixel baseline offset matched the actual UK Forms component when measured in a browser. The approved GOV.UH government identity assets are used instead of the UK artwork.

## Remaining operational dependency

**An authorised UH support-ticket receiving provider has not been configured.** The original three-choice Support journey is present. For an unconfigured provider, the application states that online Support messages cannot currently be accepted and links to the Government Digital Service contact information. The backend rejects attempted ticket submissions rather than falsely reporting delivery.

That outstanding support capability must be implemented and tested before describing the **entire Forms Support service** as complete. Forms Admin/Signon, organisation permissions, form-publication authority, Forms Runner, submissions, records, recovery and access require their own end-to-end operational acceptance; a green public product-page release does not establish their completion.

## Release control and further changes

Each subsequent application change must originate in the maintained UH GitHub repository, follow the established source review and native tests, and be built from an exact reviewed revision. Retain the immutable source SHA and image digest, ensure the existing runtime remains available for rollback, verify the canonical HTTPS service and maintain the product-local release receipt.

The earlier `patches/` directory and `reconstruct.sh` remain historical transition evidence only. Their conflicting expected tree hashes are not release authority. Do not rebuild or publish the product page from those patches or an untracked VPS-only source tree.

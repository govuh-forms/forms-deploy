# GOV.UH Forms product page — source and release authority

**Maintained application repository:** [govuh-forms/forms-product-page](https://github.com/govuh-forms/forms-product-page). This is the authorised UH fork of the native [govuk-forms/forms-product-page](https://github.com/govuk-forms/forms-product-page) Rails application. The original upstream source history, licences and application architecture are retained. This deployment repository is responsible for deployment configuration, not for maintaining a competing copy of the product-page application source.

## Source transition, 9 October 2026

The UH adaptation is under review in [forms-product-page pull request #1](https://github.com/govuh-forms/forms-product-page/pull/1), branch `uh/forms-public-and-support-20261009`.

| Item | Verified revision |
| --- | --- |
| Original upstream baseline | `806fc5bf1c363f25d77f0d0f6e3bb4a412df723d` |
| UH fork review commit | `c3d1913043bb3766b59cc182e806faa5465d3f9b` |
| UH candidate source tree | `55d69b00ea25ee1d72a38bac8f30d0928b8395ea` |
| VPS GitHub-sourced candidate image digest | `sha256:a18849acd285f11a8470c01c114af62b76f1bfda2851682dbc8c6aac0972d1e1` |

The candidate source tree is byte-identical to the previously tested VPS candidate source tree. The candidate image was built from a checkout of the **GitHub commit** and labelled with that exact revision. The image has passed unauthenticated homepage, Support, Get started, About and health-path smoke tests. It has **not** been accepted or promoted to production.

## Earlier source reconstruction

The `patches/` directory and `reconstruct.sh` are **retained as historical migration evidence**. They were created before the dedicated product-page fork became available. They are not a production build or publication authority and must not be substituted for an exact reviewed commit from `govuh-forms/forms-product-page`.

The earlier README and the reconstruction script carried different expected source-tree hashes. Neither old value establishes the present UH release source. Historical reconstruction should be investigated separately if needed; it is not part of the active deployment path.

## Acceptance and promotion

Before production promotion, the responsible release owner must:

1. Review and merge the source change after upstream Ruby, JavaScript, lint, security, browser, accessibility and service integration checks have passed.
2. Verify the original GOV.UK Frontend identity component has only the approved UH artwork substituted, including the correct UH government arms and no UK Royal Arms.
3. Establish an authorised support-ticket receiving service, or retain a clearly disclosed non-submission route without falsely confirming delivery.
4. Test the actual Forms Admin/Signon and Forms Runner integration, authentication, records and service-ownership boundaries.
5. Record exact reviewed GitHub commit, dependency locks, immutable image digest, deployment configuration, database and asset recovery evidence, canonical HTTPS readback, and the previous releasable rollback.
6. Promote only through the accepted singular release mechanism. A locally launched container or a passing HTTP 200 probe is not production acceptance.

The pre-existing production image and rollback arrangement remain in force until a separately verified promotion. The application source in the UH GitHub repository is authoritative for **new review and build work**; neither the historical patch set nor the earlier VPS worktree is a parallel production publishing authority.

# GOV.UH Forms public product page — source and release

The native Rails application is maintained in [govuh-forms/forms-product-page](https://github.com/govuh-forms/forms-product-page), preserving the upstream history from [govuk-forms/forms-product-page](https://github.com/govuk-forms/forms-product-page). This deployment repository is not a competing product-page source tree.

## Production release — 9 October 2026

| Record | Value |
| --- | --- |
| GitHub source revision | `561b118cda98a703225b42e0f9f7f5eb0c2bb581` |
| Immutable image digest | `sha256:58ccb55b97b1ba55104fba8d1be2ca27021438b0e2f104ee1c3c78a8afbe8e9c` |
| Canonical website | `https://forms.service.gov.uhrblx.com/` |
| Native Docker container | `govuh-forms-product-page-main-561b118` |
| Public reverse proxy | `127.0.0.1:5973` |
| Previous releasable container | `govuh-forms-product-page-main-3b6efa43` |
| Rollback route snapshot | `/etc/caddy/uhde-backups/forms-service.pre-get-started-main561-20261009.caddy` |
| Production receipt | `/var/lib/uhde/production/app-releases/forms-product-page.json` |
| GitHub Tests run | `37866014010` — success |
| GitHub Build image run | `37866014036` — success |

The current main release repairs the Get started page using the native Rails GOV.UK start-button helper and removes Kramdown attribute text rendered literally in the older page. It retains the corrected GOV.UH institutional header using the native GOV.UK Frontend logotype/product name geometry and the centrally owned GOV.UH logo. The pinned Alpine base image is no longer subject to a live `apk upgrade --available` during builds.

Canonical HTTPS and responsive browser readback confirmed the start button, correct editor link, no leaked markup, loaded government logo and working public routes. The administration and runner services remained available.

**Scope of acceptance:** the public product-page release has a machine-readable `deployment_complete=true` receipt. This is not completion of Forms Admin, service commissioning, support-ticket delivery, form publishing, records or submissions. The separate Admin shared-header release and its receipt are described in [Forms Admin source and release](../forms-admin/README.md). An authorised UH Support ticket recipient remains unconfigured, and online support enquiries are consequently not accepted.

## Previous and historical material

The previously accepted public release `3b6efa43284641605fb4aa7dc0c4d1eecc96df38` is retained for rollback. Earlier `patches/` and `reconstruct.sh` remain historical migration evidence only and have **no publishing authority**. Do not rebuild live code from these patches.

Further changes must use the maintained UH GitHub repository, preserve upstream lineage, pass its native source and security checks, build from an exact source revision and produce an immutable product-local image, live readback and rollback evidence. The authorised technical publishing route governs production deployment; updating the GitHub repository alone is not publication.

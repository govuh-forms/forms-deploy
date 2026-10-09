# GOV.UH Forms administration — source and release

The native Forms Admin Rails application is maintained in [govuh-forms/forms-admin](https://github.com/govuh-forms/forms-admin), retaining upstream [govuk-forms/forms-admin](https://github.com/govuk-forms/forms-admin) source history and GOV.UK Frontend components.

## Production application-wide header correction — 9 October 2026

| Record | Value |
| --- | --- |
| GitHub `main` revision | `166a71cdc43f29570c041416f34819a7a0f98d77` |
| Immutable image digest | `sha256:a0152c4572c36a9d1fcbf6d15d5f0a5807163c1fe428118bf1fb3ab0361fb035` |
| Native container | `govuh-forms-admin-main-166a71c` |
| Public admin hostname | `https://admin.forms.service.gov.uhrblx.com/` |
| Reverse proxy | `127.0.0.1:5971` |
| Previous container | `govuh-forms-admin-current-20261009` |
| Previous reverse proxy | `127.0.0.1:5916` |
| Rollback config | `/etc/caddy/uhde-backups/forms-service.pre-native-platform-alignment-20261009.caddy` |
| Production receipt | `/var/lib/uhde/production/app-releases/forms-admin.json` |

The fix belongs to `HeaderComponent::View` and its component stylesheet; it is shared throughout the application, including the authenticated groups, people, organisations, brands and reporting views. The GOV.UH identity graphic remains at the central GOV.UH branding URL. The header now uses the native `govuk-header__logotype` and `govuk-header__product-name` markup and layout rather than a page-specific flex override. Environment names continue to be rendered by the existing component. Responsive measurements were checked on a separate test render, and production sign-in and health routes returned HTTP 200 after cutover.

The fork's inherited UK deployment and review-environment hooks were removed, retaining the native Tests workflow and an independent UH build-only workflow. The Alpine base remains pinned; arbitrary `apk upgrade --available` steps have been removed.

**GitHub Actions status:** the administration fork had no recorded workflow runs at release time. Do not describe native GitHub CI as having passed. The exact GitHub-sourced VPS production image compiled and its shared header component, stylesheet, sign-in and health endpoints were checked. GitHub Actions should be enabled and tested for ongoing delivery assurance.

The receipt's `deployment_complete=true` applies to this shared-header release, not to end-to-end authentication, editing, publication, runner interoperability, submissions, records, retention, ticketing, backups or recovery. Those require separate operational acceptance.

Further source changes must use the native UH GitHub fork, with original upstream lineage retained and the production image, records and rollback traceable to the exact reviewed revision.

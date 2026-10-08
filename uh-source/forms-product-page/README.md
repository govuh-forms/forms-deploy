# GOV.UH Forms product page — controlled application source

**Source owner:** GOV.UH Forms product. **Release control:** `govuh-forms/forms-deploy` under this `uh-source/forms-product-page` directory. This is the native upstream `govuk-forms/forms-product-page` application and its required UH source adaptations; it is not a new frontend.

**Upstream source:** `https://github.com/govuk-forms/forms-product-page`, commit `806fc5bf1c363f25d77f0d0f6e3bb4a412df723d`. Apply all five ordered patch files using `reconstruct.sh` against a *fresh disposable checkout of exactly that commit*. The resulting checked-out tree must hash to `6c5893e8e0d2bf5377d6b1679f015ba571833584`. Do not treat a commit message or build passing as sufficient evidence of source parity.

**UH adaptations retained:** the existing GOV.UH product pages, guidance and security configuration from the original project worktree plus the present source-based shared-GOV.UH-identity and public-page navigation corrections. The source patch set preserves provenance rather than silently replacing the UK code.

**Government identity:** use the authoritative, live GOV.UH header logo `/uh-brand/gov-uh-site-identity-logo.svg` and government arms `/uh-brand/uh-government-coat-of-arms.webp`. Standard GOV.UK Frontend footer CSS includes both an image and a CSS mask of `govuk-crest.svg` on the copyright `::before` element; the UH institutional Sass override must replace the image **and disable the UK Royal Arms mask**. Do not import the UK Royal Arms SVG into GOV.UH product assets. The standard GDS crown in government logotype remains an allowed element.

**Public navigation:** the public Forms support site cannot infer whether an editor is signed into the separate Admin application. Its link to that application is therefore labelled `Manage forms`, which reflects its destination, rather than `Sign in` or `Sign out`. Actual user sessions remain owned by Signon and Forms Admin.

**Delivery:** build native app code from this source tree, test the approved footer SVG/WebP visual contents at desktop/mobile widths, retain rollback and backup as appropriate, publish an immutable source-labelled image, and verify the actual HTTPS product and support pages. This patch-based source package should move to a dedicated `govuh-forms/forms-product-page` repository when repository creation is available, retaining upstream provenance. It is not acceptable as an untracked VPS-only edit.

**Future services:** GOV.UH product provisioning must begin with the authoritative shared government identity and correct UH government arms in the native service header/footer components. This requirement applies to each new independent government web application and its error pages, not only GOV.UH Whitehall pages.
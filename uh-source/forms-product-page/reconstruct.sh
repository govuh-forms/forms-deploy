#!/usr/bin/env bash
# Rebuild GOV.UH Forms Product Page using pinned native UK application source.
set -euo pipefail
if [[ $# != 1 ]]; then echo "Usage: $0 <disposable forms-product-page source checkout>" >&2; exit 2; fi
source_dir="$(realpath "$1")"
here="$(dirname "$(realpath "$0")")"
upstream_sha="806fc5bf1c363f25d77f0d0f6e3bb4a412df723d"
expected_tree="2d3aaf4ad249c9c5224e80ee8f5cadba13d7e646"
[[ "$(git -C "$source_dir" rev-parse --is-inside-work-tree 2>/dev/null)" == "true" ]] || { echo "Expected a dedicated Git checkout" >&2; exit 1; }
actual_sha="$(git -C "$source_dir" rev-parse HEAD)"
[[ "$actual_sha" == "$upstream_sha" ]] || {
  echo "Refusing product build: upstream revision does not match pinned SHA" >&2
  exit 1
}
[[ -z "$(git -C "$source_dir" status --porcelain)" ]] || {
  echo "Refusing to patch a dirty checkout" >&2
  exit 1
}
for patch in "$here"/patches/0*.patch; do
  git -C "$source_dir" apply --check "$patch"
  git -C "$source_dir" apply "$patch"
done
git -C "$source_dir" add -A
actual_tree="$(git -C "$source_dir" write-tree)"
if [[ "$actual_tree" != "$expected_tree" ]]; then
  echo "Source tree checksum mismatch: expected $expected_tree, actual $actual_tree" >&2
  exit 1
fi
echo "GOV.UH Forms product source tree verified: $actual_tree"

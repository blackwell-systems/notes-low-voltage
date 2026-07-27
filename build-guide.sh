#!/usr/bin/env bash
# Regenerate guide-content.html (the HTML fragment the quiz app loads into the
# study-guide side panel) from STUDY-GUIDE.md. Run this after editing the guide.
#
# Requires pandoc (brew install pandoc).
set -euo pipefail
cd "$(dirname "$0")"
pandoc -f gfm -t html --syntax-highlighting=none STUDY-GUIDE.md -o guide-content.html
echo "Wrote guide-content.html ($(wc -c < guide-content.html) bytes)"

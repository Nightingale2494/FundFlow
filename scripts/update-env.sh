#!/usr/bin/env bash
set -euo pipefail
CONTRACT_ID="${1:?Usage: scripts/update-env.sh CONTRACT_ID}"
cp .env.example .env.local
python3 - <<PY
from pathlib import Path
path = Path('.env.local')
text = path.read_text().replace('CONTRACT_ADDRESS_HERE', '$CONTRACT_ID')
path.write_text(text)
PY

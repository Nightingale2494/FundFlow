#!/usr/bin/env bash
set -euo pipefail
WASM="contracts/target/wasm32-unknown-unknown/release/fundflow.wasm"
stellar contract optimize --wasm "$WASM"

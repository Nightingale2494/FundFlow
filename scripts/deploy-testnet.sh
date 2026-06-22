#!/usr/bin/env bash
set -euo pipefail
WASM="contracts/target/wasm32-unknown-unknown/release/fundflow.optimized.wasm"
NETWORK="testnet"
SOURCE="${STELLAR_SOURCE_ACCOUNT:?Set STELLAR_SOURCE_ACCOUNT to your Stellar CLI identity}"
stellar contract deploy --wasm "$WASM" --source "$SOURCE" --network "$NETWORK"

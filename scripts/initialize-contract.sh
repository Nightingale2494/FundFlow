#!/usr/bin/env bash
set -euo pipefail
CONTRACT_ID="${NEXT_PUBLIC_CONTRACT_ID:?Set NEXT_PUBLIC_CONTRACT_ID}"
NATIVE_TOKEN="${STELLAR_NATIVE_TOKEN_CONTRACT_ID:?Set STELLAR_NATIVE_TOKEN_CONTRACT_ID}"
SOURCE="${STELLAR_SOURCE_ACCOUNT:?Set STELLAR_SOURCE_ACCOUNT}"
stellar contract invoke --id "$CONTRACT_ID" --source "$SOURCE" --network testnet -- initialize --native_token "$NATIVE_TOKEN"

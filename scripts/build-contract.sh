#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../contracts"
cargo build --target wasm32-unknown-unknown --release -p fundflow

param(
  [string]$SourceAccount = "alice"
)

$ErrorActionPreference = "Stop"
$contractDir = Join-Path $PSScriptRoot "trust_payment"

Push-Location $contractDir
try {
  cargo build --target wasm32-unknown-unknown --release

  $wasmPath = "target/wasm32-unknown-unknown/release/trust_payment.wasm"
  if (-not (Test-Path $wasmPath)) {
    throw "WASM artifact not found at $wasmPath"
  }

  soroban contract deploy --wasm $wasmPath --source $SourceAccount --network testnet
}
finally {
  Pop-Location
}

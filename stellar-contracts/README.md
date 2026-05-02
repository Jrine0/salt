# stellar-contracts

Soroban contracts for creditly.

## Prerequisites

- Rust toolchain
- Soroban CLI

## Build

```bash
cd stellar-contracts/trust_payment
cargo build --target wasm32-unknown-unknown --release
```

## Deploy (Stellar Testnet)

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/trust_payment.wasm \
  --source alice \
  --network testnet
```

On Windows PowerShell, you can also use:

```powershell
.\deploy-testnet.ps1 -SourceAccount alice
```

After deployment, set the returned contract id in:

- VITE_STELLAR_CONTRACT_ID

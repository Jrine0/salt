# creditly

creditly is a Stellar-based trust and rewards platform built for students and first-time earners.

It combines wallet-driven activity, trust scoring, levels, and reward redemption in a Testnet-first flow.

## Highlights

- Connects to Freighter wallet on Stellar Testnet
- Tracks trust score, warnings, rewards, and credit tiers
- Supports payment and reward actions backed by Soroban contract calls
- Includes Prisma + SQLite persistence for app data
- Falls back to demo wallet behavior when Freighter is unavailable

## Tech Stack

- React 18 + Vite 6 + TypeScript
- Tailwind CSS + Radix UI components
- Prisma ORM + SQLite
- @stellar/stellar-sdk + Freighter integration
- Soroban smart contract workspace in `stellar-contracts`

## Project Structure

```text
src/
	app/            # Pages and UI components
	context/        # Global app state and wallet/payment actions
	lib/            # Blockchain, auth, Prisma utilities
	server/         # Server-side auth helpers
	styles/         # Global styles and themes
prisma/           # Prisma schema and migrations
stellar-contracts/# Soroban contract workspace
```

## Prerequisites

- Node.js 18+
- npm
- (Optional, for contract development) Rust toolchain + Soroban CLI
- (Optional, for wallet flows) Freighter browser extension

## Local Development

1. Install dependencies.

```bash
npm install
```

2. Create a `.env` file at the repository root.

```env
DATABASE_URL="file:./dev.db"
VITE_STELLAR_HORIZON_URL="https://horizon-testnet.stellar.org"
VITE_STELLAR_RPC_URL="https://soroban-testnet.stellar.org"
VITE_STELLAR_CONTRACT_ID=""
JWT_SECRET="change-me-for-non-demo-usage"
```

3. Initialize Prisma client and database.

```bash
npx prisma generate
npx prisma migrate dev
```

4. Start the Vite development server.

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev     # Start local dev server
npm run build   # Production build
```

## Environment Variables

- `DATABASE_URL`: SQLite connection string used by Prisma
- `VITE_STELLAR_HORIZON_URL`: Horizon endpoint (defaults to Testnet)
- `VITE_STELLAR_RPC_URL`: Soroban RPC endpoint (defaults to Testnet)
- `VITE_STELLAR_CONTRACT_ID`: Soroban contract ID used for on-chain actions
- `JWT_SECRET`: Secret used by server auth token helpers

If `VITE_STELLAR_CONTRACT_ID` is empty, contract-invoking calls run in simulated mode.

## Soroban Contract Workspace

Contracts live in `stellar-contracts/trust_payment`.

Build:

```bash
cd stellar-contracts/trust_payment
cargo build --target wasm32-unknown-unknown --release
```

Deploy to Stellar Testnet:

```bash
soroban contract deploy \
	--wasm target/wasm32-unknown-unknown/release/trust_payment.wasm \
	--source alice \
	--network testnet
```

Windows PowerShell helper:

```powershell
cd stellar-contracts
.\deploy-testnet.ps1 -SourceAccount alice
```

After deploy, set the returned contract id in `VITE_STELLAR_CONTRACT_ID`.

## App Routes

- `/` landing page
- `/login`, `/signup` authentication page flow
- `/dashboard` trust and account dashboard
- `/payments` payment flow
- `/rewards` reward redemption
- `/levels`, `/history`, `/predictions`, `/investor`, `/risk` supporting views

## Notes

- This repository is Stellar-only.
- Network assumptions are based on Stellar Testnet.
- Freighter APIs may return either string or object payloads; both are handled.

## Troubleshooting

- Wallet not connecting: confirm Freighter is installed and unlocked.
- Wrong network error: switch Freighter to Stellar Testnet.
- Missing contract effects: ensure `VITE_STELLAR_CONTRACT_ID` is set.
- Prisma issues: verify `.env` exists and rerun `npx prisma generate`.

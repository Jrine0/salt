# creditly

creditly is a Stellar-based trust and rewards platform for students and first-time earners.

## What It Does

- Connects user wallets through Freighter
- Tracks trust behavior and reward progress
- Uses Stellar Testnet as the default network
- Supports trust score-driven rewards and credit tiers

## Tech Stack

- React + Vite + TypeScript
- Prisma + SQLite
- Stellar SDK + Freighter wallet integration
- Soroban contract workspace in stellar-contracts

## Run Locally

```bash
npm install
npm run dev
```

## Environment Variables

Copy .env.example to .env and adjust values:

```env
DATABASE_URL="file:./dev.db"
VITE_STELLAR_HORIZON_URL="https://horizon-testnet.stellar.org"
VITE_STELLAR_RPC_URL="https://soroban-testnet.stellar.org"
VITE_STELLAR_CONTRACT_ID=""
```

## Contract Workspace

The Soroban contract project is located in stellar-contracts.

## Notes

- This repository is Stellar-only.
- Legacy non-Stellar artifacts have been removed.

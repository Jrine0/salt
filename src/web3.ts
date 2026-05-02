import { blockchainService } from '@/lib/blockchain';

export async function connectWallet() {
  const wallet = await blockchainService.connectWallet();
  const balance = await blockchainService.getBalance(wallet.address);

  return {
    provider: 'stellar',
    address: wallet.address,
    balance,
  };
}

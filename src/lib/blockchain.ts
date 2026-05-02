import {
  BASE_FEE,
  Contract,
  Horizon,
  Keypair,
  Networks,
  TransactionBuilder,
  nativeToScVal,
} from '@stellar/stellar-sdk';
import { Server as SorobanServer } from '@stellar/stellar-sdk/rpc';
import { toast } from 'sonner';

const HORIZON_URL =
  import.meta.env.VITE_STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org';
const SOROBAN_RPC_URL =
  import.meta.env.VITE_STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org';
const CONTRACT_ID = import.meta.env.VITE_STELLAR_CONTRACT_ID || '';
const TESTNET_PASSPHRASE = Networks.TESTNET;

export class BlockchainService {
  private horizonServer = new Horizon.Server(HORIZON_URL);
  private rpcServer = new SorobanServer(SOROBAN_RPC_URL, {
    allowHttp: SOROBAN_RPC_URL.startsWith('http://'),
  });
  private connectedAddress: string | null = null;

  async connectWallet(): Promise<{
    address: string;
    provider: 'stellar';
  }> {
    if (!window.freighterApi?.requestAccess) {
      const demoAddress = this.generateDemoAddress();
      this.connectedAddress = demoAddress;
      return { address: demoAddress, provider: 'stellar' };
    }

    try {
      const accessResponse = await window.freighterApi.requestAccess();
      const address = this.extractAddress(accessResponse);
      if (!address) {
        throw new Error('Unable to get wallet address from Freighter');
      }

      this.connectedAddress = address;
      return { address, provider: 'stellar' };
    } catch {
      const demoAddress = this.generateDemoAddress();
      this.connectedAddress = demoAddress;
      throw new Error(`Freighter connection failed. Using demo wallet: ${demoAddress}`);
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      const account = await this.horizonServer.loadAccount(address);
      const native = account.balances.find((balance: any) => balance.asset_type === 'native');
      return native?.balance || '0.0000000';
    } catch {
      return '0.0000000';
    }
  }

  async makePayment(xlmAmount: string): Promise<{ status: string; txHash?: string }> {
    try {
      const txHash = await this.invokeSorobanContract('make_payment', [
        this.xlmToStroops(xlmAmount),
        'ontime',
      ]);
      return { status: 'confirmed', txHash };
    } catch (error) {
      console.error('Payment error:', error);
      return { status: 'failed' };
    }
  }

  async redeemPoints(
    points: number
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    if (!this.connectedAddress) {
      throw new Error('Wallet not connected or contract not initialized');
    }

    try {
      const txHash = await this.invokeSorobanContract('redeem_reward_points', [points]);
      return { success: true, txHash };
    } catch (error) {
      console.error('Redemption error:', error);
      return { success: false, error: 'Points redemption failed' };
    }
  }

  async getUserTrustData(): Promise<any> {
    if (!this.connectedAddress) {
      throw new Error('Wallet not connected or contract not initialized');
    }

    return {
      trustScore: 0,
      level: 1,
      creditLine: 10000,
      interestRate: 4,
      outstandingBalance: 0,
      warningsCount: 0,
      rewardPoints: 0,
      isActive: true,
      walletAddress: this.connectedAddress,
    };
  }

  async registerUser(
    walletAddress: string
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    if (!this.connectedAddress) {
      throw new Error('Wallet not connected or contract not initialized');
    }

    try {
      toast.loading('Registration in progress...');
      const txHash = await this.invokeSorobanContract('register_user', [walletAddress]);

      toast.success('User registered successfully!');
      return { success: true, txHash };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('User registration failed');
      return { success: false, error: 'User registration failed' };
    }
  }

  isWalletConnected(): boolean {
    return !!this.connectedAddress;
  }

  getSigner(): null {
    return null;
  }

  async ensureStellarTestnet(): Promise<{ success: boolean; error?: string }> {
    if (!window.freighterApi) {
      return { success: false, error: 'Freighter not installed' };
    }

    try {
      const networkDetails = await window.freighterApi.getNetworkDetails?.();
      if (networkDetails?.error) {
        return { success: false, error: networkDetails.error };
      }

      if (
        networkDetails?.networkPassphrase &&
        networkDetails.networkPassphrase !== TESTNET_PASSPHRASE
      ) {
        return { success: false, error: 'Please switch Freighter to Stellar Testnet' };
      }

      return { success: true };
    } catch {
      return { success: false, error: 'Failed to verify Stellar Testnet in Freighter' };
    }
  }

  private generateDemoAddress(): string {
    return Keypair.random().publicKey();
  }

  private extractAddress(response: unknown): string | null {
    if (typeof response === 'string') {
      return response;
    }

    if (response && typeof response === 'object' && 'address' in response) {
      const maybeAddress = (response as { address?: string }).address;
      return typeof maybeAddress === 'string' ? maybeAddress : null;
    }

    return null;
  }

  private xlmToStroops(xlmAmount: string): string {
    const numeric = Number.parseFloat(xlmAmount);
    if (Number.isNaN(numeric) || numeric <= 0) {
      return '0';
    }

    return String(Math.round(numeric * 10_000_000));
  }

  private toScVal(value: string | number) {
    if (typeof value === 'number') {
      if (Number.isInteger(value) && value >= 0) {
        return nativeToScVal(value, { type: 'u32' });
      }
      return nativeToScVal(value);
    }

    if (typeof value === 'string') {
      if (/^G[A-Z0-9]{55}$/.test(value)) {
        return nativeToScVal(value, { type: 'address' });
      }

      if (/^\d+$/.test(value)) {
        return nativeToScVal(value, { type: 'i128' });
      }

      if (/^[a-z_]+$/i.test(value)) {
        return nativeToScVal(value, { type: 'symbol' });
      }
    }

    return nativeToScVal(value);
  }

  private async signWithFreighter(txXdr: string): Promise<string> {
    if (!window.freighterApi?.signTransaction) {
      throw new Error('Freighter signTransaction API is unavailable');
    }

    const response = await window.freighterApi.signTransaction(txXdr, {
      network: 'TESTNET',
      networkPassphrase: TESTNET_PASSPHRASE,
      address: this.connectedAddress || undefined,
    });

    if (typeof response === 'string') {
      return response;
    }

    if (response?.error) {
      throw new Error(response.error);
    }

    if (!response?.signedTxXdr) {
      throw new Error('Freighter returned an invalid signed transaction payload');
    }

    return response.signedTxXdr;
  }

  private async waitForTransactionResult(hash: string): Promise<string> {
    const attempts = 12;

    for (let i = 0; i < attempts; i += 1) {
      const statusResponse = await this.rpcServer.getTransaction(hash);

      if (statusResponse.status === 'SUCCESS') {
        return hash;
      }

      if (statusResponse.status === 'FAILED') {
        throw new Error('Soroban transaction failed on-chain');
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    return hash;
  }

  private async invokeSorobanContract(
    functionName: string,
    args: Array<string | number>
  ): Promise<string> {
    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    if (!CONTRACT_ID || !window.freighterApi?.signTransaction) {
      return `simulated-${functionName}-${Date.now()}`;
    }

    const account = await this.rpcServer.getAccount(this.connectedAddress);
    const contract = new Contract(CONTRACT_ID);

    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: TESTNET_PASSPHRASE,
    })
      .addOperation(contract.call(functionName, ...args.map((arg) => this.toScVal(arg))))
      .setTimeout(60)
      .build();

    const preparedTx = await this.rpcServer.prepareTransaction(tx);
    const signedTxXdr = await this.signWithFreighter(preparedTx.toXDR());
    const signedTx = TransactionBuilder.fromXDR(signedTxXdr, TESTNET_PASSPHRASE);
    const sendResponse = await this.rpcServer.sendTransaction(signedTx);

    if (sendResponse.errorResultXdr) {
      throw new Error('Soroban RPC rejected transaction submission');
    }

    if (!sendResponse.hash) {
      throw new Error('Missing transaction hash from Soroban RPC response');
    }

    return this.waitForTransactionResult(sendResponse.hash);
  }
}

export const blockchainService = new BlockchainService();

declare global {
  interface Window {
    freighterApi?: {
      requestAccess?: () => Promise<string | { address?: string; error?: string }>;
      getNetworkDetails?: () => Promise<{
        networkPassphrase?: string;
        network?: string;
        error?: string;
      }>;
      signTransaction?: (
        xdr: string,
        opts?: { network?: string; networkPassphrase?: string; address?: string }
      ) => Promise<string | { signedTxXdr?: string; signerAddress?: string; error?: string }>;
    };
  }
}

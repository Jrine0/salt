import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { blockchainService } from '@/lib/blockchain';

export const XLM_INR_RATE = 25;

export function xlmToInr(xlm: string | number): number {
  const value = typeof xlm === 'string' ? parseFloat(xlm) : xlm;
  return Math.round(value * XLM_INR_RATE);
}

interface User {
  id?: string;
  name: string;
  email: string;
  walletAddress: string;
  trustScore: number;
  level: number;
  nextLevelScore: number;
  creditLine: number;
  interestRate: number;
  outstandingBalance: number;
  rewardPoints: number;
  warningsCount: number;
  joinedDate: string;
  isConnected: boolean;
  xlmBalance: string;
  xlmBalanceInr: number;
}

interface AppState {
  user: User;
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CONNECT_WALLET'; payload: { address: string; balance: string } }
  | { type: 'DISCONNECT_WALLET' }
  | { type: 'UPDATE_USER_DATA'; payload: Partial<User> }
  | { type: 'MAKE_PAYMENT'; payload: { newScore: number; newBalance: number; newXlmBalance: string } }
  | { type: 'REDEEM_REWARD'; payload: { newPoints: number } }
  | { type: 'INITIALIZE_RANDOM_DATA' }
  | { type: 'GENERATE_RANDOM_XLM'; payload: string };

const initialState: AppState = {
  user: {
    name: '',
    email: '',
    walletAddress: '',
    trustScore: 0,
    level: 1,
    nextLevelScore: 2500,
    creditLine: 10000,
    interestRate: 4,
    outstandingBalance: 0,
    rewardPoints: 0,
    warningsCount: 0,
    joinedDate: new Date().toISOString().split('T')[0],
    isConnected: false,
    xlmBalance: '0.0000000',
    xlmBalanceInr: 0,
  },
  isLoading: false,
  error: null,
};

function calculateLevel(score: number) {
  if (score < 2500) return 1;
  if (score < 5000) return 2;
  if (score < 7500) return 3;
  if (score < 10000) return 4;
  return 5;
}

function calculateInterestRate(score: number) {
  if (score < 4000) return 4;
  if (score < 7000) return 3;
  return 2;
}

function calculateCreditLine(score: number) {
  if (score < 2500) return 10000;
  if (score < 5000) return 15000;
  if (score < 7500) return 20000;
  if (score < 10000) return 25000;
  return 30000;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CONNECT_WALLET':
      return {
        ...state,
        user: {
          ...state.user,
          walletAddress: action.payload.address,
          xlmBalance: action.payload.balance,
          xlmBalanceInr: xlmToInr(action.payload.balance),
          isConnected: true,
        },
        error: null,
        isLoading: false,
      };
    case 'DISCONNECT_WALLET':
      return {
        ...state,
        user: {
          ...state.user,
          walletAddress: '',
          xlmBalance: '0.0000000',
          xlmBalanceInr: 0,
          isConnected: false,
        },
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case 'MAKE_PAYMENT':
      return {
        ...state,
        user: {
          ...state.user,
          trustScore: action.payload.newScore,
          outstandingBalance: action.payload.newBalance,
          xlmBalance: action.payload.newXlmBalance,
          xlmBalanceInr: xlmToInr(action.payload.newXlmBalance),
          level: calculateLevel(action.payload.newScore),
        },
      };
    case 'REDEEM_REWARD':
      return {
        ...state,
        user: {
          ...state.user,
          rewardPoints: action.payload.newPoints,
        },
      };
    case 'INITIALIZE_RANDOM_DATA': {
      const score = Math.floor(Math.random() * 8000) + 2000;
      return {
        ...state,
        user: {
          ...state.user,
          outstandingBalance: Math.floor(Math.random() * 9000) + 1000,
          trustScore: score,
          rewardPoints: Math.floor(score / 10),
          warningsCount: Math.random() > 0.7 ? 1 : 0,
          interestRate: calculateInterestRate(score),
          creditLine: calculateCreditLine(score),
          level: calculateLevel(score),
        },
      };
    }
    case 'GENERATE_RANDOM_XLM': {
      const newXlmBalance = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          xlmBalance: newXlmBalance,
          xlmBalanceInr: xlmToInr(newXlmBalance),
        },
      };
    }
    default:
      return state;
  }
}

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const connectWallet = async (address?: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      let walletAddress: string;
      let balance: string;

      if (address) {
        walletAddress = address;
        balance = (Math.random() * 50 + 5).toFixed(7);
      } else {
        const result = await blockchainService.connectWallet();
        walletAddress = result.address;
        balance = await blockchainService.getBalance(walletAddress);
      }

      dispatch({
        type: 'CONNECT_WALLET',
        payload: { address: walletAddress, balance },
      });

      if (!state.user.name) {
        const randomNames = ['Alex Johnson', 'Sarah Williams', 'Mike Chen', 'Emma Davis', 'John Smith'];
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        dispatch({
          type: 'UPDATE_USER_DATA',
          payload: {
            name: randomName,
            email: `${randomName.toLowerCase().replace(' ', '.')}@demo.com`,
          },
        });
      }

      dispatch({ type: 'INITIALIZE_RANDOM_DATA' });
      return { success: true, message: 'Wallet connected successfully!' };
    } catch (err: any) {
      const message = err?.message || 'Wallet connection failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const disconnectWallet = () => {
    dispatch({ type: 'DISCONNECT_WALLET' });
  };

  const logout = () => {
    dispatch({ type: 'DISCONNECT_WALLET' });
  };

  const login = async (_email: string, _password: string) => {
    return { success: true, message: 'Login successful' };
  };

  const signup = async (_name: string, _email: string, _password: string) => {
    return { success: true, message: 'Signup successful' };
  };

  const makePayment = async (amountInInr: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      if (!state.user.isConnected) {
        throw new Error('Wallet not connected');
      }

      const maxPayment = xlmToInr(state.user.xlmBalance);
      if (parseFloat(amountInInr) > maxPayment) {
        throw new Error(`Insufficient XLM balance. Max allowed: INR ${maxPayment}`);
      }

      const paymentInInr = Number(amountInInr);
      const newBalance = Math.max(0, state.user.outstandingBalance - paymentInInr);

      const pointsEarned = Math.floor(paymentInInr / 10);
      const newScore = state.user.trustScore + pointsEarned;
      const newRewardPoints = state.user.rewardPoints + pointsEarned;

      const xlmUsed = Number(amountInInr) / XLM_INR_RATE;
      const currentXlm = parseFloat(state.user.xlmBalance);
      const newXlmBalance = Math.max(0, currentXlm - xlmUsed).toFixed(7);

      const chainResult = await blockchainService.makePayment(xlmUsed.toFixed(7));
      if (chainResult.status !== 'confirmed') {
        throw new Error('On-chain payment confirmation failed');
      }

      dispatch({
        type: 'MAKE_PAYMENT',
        payload: { newScore, newBalance, newXlmBalance },
      });

      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: { rewardPoints: newRewardPoints },
      });

      return true;
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'Payment failed' });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const redeemReward = async (_rewardId: string, points: number) => {
    const redemption = await blockchainService.redeemPoints(points);
    if (!redemption.success) {
      dispatch({ type: 'SET_ERROR', payload: redemption.error || 'Redemption failed' });
      return false;
    }

    dispatch({
      type: 'REDEEM_REWARD',
      payload: { newPoints: state.user.rewardPoints - points },
    });
    return true;
  };

  const initializeUserData = () => {
    dispatch({ type: 'INITIALIZE_RANDOM_DATA' });
  };

  const generateRandomXlm = () => {
    const randomXlm = (Math.random() * 50 + 5).toFixed(7);
    dispatch({ type: 'GENERATE_RANDOM_XLM', payload: randomXlm });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        connectWallet,
        disconnectWallet,
        logout,
        login,
        signup,
        makePayment,
        redeemReward,
        initializeUserData,
        generateRandomXlm,
        xlmToInr,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

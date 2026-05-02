import { jwtDecode } from "jwt-decode";

export interface JWTPayload {
  userId: string;
  email: string;
}

/**
 * Decode JWT payload in the browser (NO verification)
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
}

export function generateRandomBalance(): number {
  return Math.floor(Math.random() * 50000) + 10000;
}

export function generateRandomRewardPoints(): number {
  return Math.floor(Math.random() * 5000) + 1000;
}

export function generateRandomCreditLine(): number {
  return Math.floor(Math.random() * 30000) + 15000;
}

export function calculateInterestRate(score: number): number {
  if (score >= 7000) return 2.0;
  if (score >= 4000) return 3.0;
  return 4.0;
}

export function calculatePointsGained(
  amount: number,
  paymentType: string
): number {
  const basePoints = Math.floor(amount / 100);

  switch (paymentType) {
    case "early":
      return basePoints * 2;
    case "on-time":
      return basePoints;
    case "late":
      return Math.floor(basePoints * 0.5);
    default:
      return basePoints;
  }
}

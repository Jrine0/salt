// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

// export interface JWTPayload {
//   userId: string
//   email: string
// }

// export async function hashPassword(password: string): Promise<string> {
//   return bcrypt.hash(password, 12)
// }

// export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
//   return bcrypt.compare(password, hashedPassword)
// }

// export function generateToken(payload: JWTPayload): string {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
// }

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    // For now, return mock payload for mock token
    if (token === 'mock-token') {
      return { userId: '1', email: 'user@example.com' }
    }
    return null
  } catch {
    return null
  }
}

export function generateRandomBalance(): number {
  return Math.floor(Math.random() * 50000) + 10000 // 10,000 to 60,000
}

export function generateRandomRewardPoints(): number {
  return Math.floor(Math.random() * 5000) + 1000 // 1,000 to 6,000
}

export function generateRandomCreditLine(): number {
  return Math.floor(Math.random() * 30000) + 15000 // 15,000 to 45,000
}

export function calculateInterestRate(score: number): number {
  if (score >= 7000) return 2.0
  if (score >= 4000) return 3.0
  return 4.0
}

// export function calculatePointsGained(amount: number, paymentType: string): number {
//   let basePoints = Math.floor(amount / 100) // 1 point per ₹100
  
//   switch (paymentType) {
//     case 'early':
//       return basePoints * 2 // Double points for early payment
//     case 'on-time':
//       return basePoints // Normal points
//     case 'late':
//       return Math.floor(basePoints * 0.5) // Half points for late payment
//     default:
//       return basePoints
//   }
// }
export const userData = {
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  walletAddress: 'GDJ5JQFGM5A3WQJPCVHQM3OTQZ76U2JXQWFQEO5M6CT2H5A3P3Y2ZQ6F',
  trustScore: 7245,
  level: 3,
  nextLevelScore: 10000,
  creditLine: 25000,
  interestRate: 3,
  outstandingBalance: 8500,
  warningsCount: 0,
  joinedDate: '2024-10-15',
};

export const levels = [
  {
    level: 1,
    name: 'Starter',
    minScore: 0,
    maxScore: 2499,
    perks: ['Basic rewards access', '5% Amazon discount'],
    color: '#6B7280',
  },
  {
    level: 2,
    name: 'Builder',
    minScore: 2500,
    maxScore: 4999,
    perks: ['8% Amazon discount', 'MakeMyTrip access'],
    color: '#3B82F6',
  },
  {
    level: 3,
    name: 'Trusted',
    minScore: 5000,
    maxScore: 7499,
    perks: ['12% Amazon discount', 'Priority support', 'Travel perks'],
    color: '#0066FF',
  },
  {
    level: 4,
    name: 'Elite',
    minScore: 7500,
    maxScore: 9999,
    perks: ['15% Amazon discount', 'Premium travel perks', 'Lower interest rates'],
    color: '#8B5CF6',
  },
  {
    level: 5,
    name: 'Champion',
    minScore: 10000,
    maxScore: Infinity,
    perks: ['20% Amazon discount', 'VIP travel perks', 'Lowest interest rates', 'Exclusive partners'],
    color: '#F59E0B',
  },
];

export const paymentHistory = [
  {
    id: '1',
    date: '2026-01-10',
    amount: 2500,
    type: 'on-time',
    description: 'Monthly payment',
  },
  {
    id: '2',
    date: '2025-12-10',
    amount: 2500,
    type: 'on-time',
    description: 'Monthly payment',
  },
  {
    id: '3',
    date: '2025-11-10',
    amount: 2500,
    type: 'on-time',
    description: 'Monthly payment',
  },
  {
    id: '4',
    date: '2025-10-12',
    amount: 2500,
    type: 'late',
    description: 'Monthly payment (2 days late)',
  },
  {
    id: '5',
    date: '2025-09-10',
    amount: 2500,
    type: 'on-time',
    description: 'Monthly payment',
  },
];

export const scoreHistory = [
  { month: 'Sep', score: 6200 },
  { month: 'Oct', score: 6500 },
  { month: 'Nov', score: 6800 },
  { month: 'Dec', score: 7100 },
  { month: 'Jan', score: 7245 },
];

export const rewards = [
  {
    id: '1',
    partner: 'Amazon',
    title: '12% Off All Purchases',
    description: 'Valid on orders above ₹999',
    minScore: 5000,
    minPoints: 1000,
    currentLevel: true,
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=200&fit=crop',
  },
  {
    id: '2',
    partner: 'MakeMyTrip',
    title: 'Exclusive Travel Deals',
    description: 'Up to ₹5000 off on domestic flights',
    minScore: 5000,
    minPoints: 1500,
    currentLevel: true,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=200&fit=crop',
  },
  {
    id: '3',
    partner: 'Amazon',
    title: '15% Off Premium Categories',
    description: 'Electronics, Fashion, and more',
    minScore: 7500,
    minPoints: 2000,
    currentLevel: false,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=200&fit=crop',
  },
  {
    id: '4',
    partner: 'MakeMyTrip',
    title: 'Premium Hotel Upgrades',
    description: 'Free room upgrades at partner hotels',
    minScore: 7500,
    minPoints: 2500,
    currentLevel: false,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=200&fit=crop',
  },
];

export const behaviorMetrics = {
  paymentFrequency: 95,
  consistency: 88,
  onTimeRate: 92,
  creditUtilization: 34,
};

export const predictions = {
  nextLevel: {
    level: 4,
    name: 'Elite',
    estimatedDays: 45,
    requiredActions: [
      '3 more on-time payments',
      'Maintain credit utilization below 40%',
      'No missed payments',
    ],
    confidenceScore: 87,
  },
};

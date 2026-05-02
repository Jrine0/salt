import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, TrendingUp, AlertTriangle, CheckCircle2, Users } from 'lucide-react';
import { userData, levels } from '@/app/utils/mockData';

export function InvestorView() {
  const currentLevel = levels.find(l => l.level === userData.level)!;
  const defaultRisk = 8; // percentage

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-light">Investor Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-gray-800 rounded-lg">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">View Only Mode</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-light mb-3">Student Credit Portfolio</h2>
          <p className="text-gray-400">View student trust metrics and risk assessment</p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Trust Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#0066FF]/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#0066FF]" />
              </div>
              <p className="text-sm text-gray-400">Trust Score</p>
            </div>
            <p className="text-4xl font-light mb-2">{userData.trustScore}</p>
            <div
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
              style={{
                backgroundColor: `${currentLevel.color}20`,
                color: currentLevel.color,
              }}
            >
              Level {currentLevel.level} • {currentLevel.name}
            </div>
          </motion.div>

          {/* Default Risk */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-400">Default Risk</p>
            </div>
            <p className="text-4xl font-light mb-2">{defaultRisk}%</p>
            <p className="text-sm text-green-500">Low Risk</p>
          </motion.div>

          {/* Credit Line Exposure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-700/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">Current Exposure</p>
            </div>
            <p className="text-4xl font-light mb-2">
              ₹{userData.outstandingBalance.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              {((userData.outstandingBalance / userData.creditLine) * 100).toFixed(0)}% of credit
              line
            </p>
          </motion.div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Student Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
          >
            <h3 className="text-xl font-light mb-6">Student Profile</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <span className="text-sm text-gray-400">Student ID</span>
                <span className="text-sm font-mono">#STU-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <span className="text-sm text-gray-400">Wallet Address</span>
                <span className="text-sm font-mono">
                  {userData.walletAddress.slice(0, 6)}...{userData.walletAddress.slice(-4)}
                </span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <span className="text-sm text-gray-400">Account Age</span>
                <span className="text-sm">
                  {Math.floor(
                    (new Date().getTime() - new Date(userData.joinedDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{' '}
                  days
                </span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <span className="text-sm text-gray-400">Payment History</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">92% On-Time</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Warnings</span>
                <span className="text-sm">
                  {userData.warningsCount}/2
                  {userData.warningsCount === 0 && (
                    <span className="ml-2 text-xs text-green-500">No warnings</span>
                  )}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Investment Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
          >
            <h3 className="text-xl font-light mb-6">Investment Analysis</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Credit Line Utilization</span>
                  <span className="text-sm font-medium">
                    {((userData.outstandingBalance / userData.creditLine) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(userData.outstandingBalance / userData.creditLine) * 100}%`,
                    }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="h-full bg-[#0066FF] rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Repayment Confidence</span>
                  <span className="text-sm font-medium text-green-500">92%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-3">Risk Factors</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Credit History</span>
                    <span className="text-green-500">Low Risk</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Payment Behavior</span>
                    <span className="text-green-500">Consistent</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Score Trend</span>
                    <span className="text-green-500">Improving</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sell Credit Line Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-[#0066FF]/10 to-transparent border border-[#0066FF]/30 rounded-2xl p-8"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-light mb-2">Credit Line Trading</h3>
              <p className="text-gray-400 mb-4">
                This student's credit line is available for purchase on the secondary market
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Asking Price</p>
                  <p className="text-lg font-medium">
                    ₹{(userData.creditLine * 0.95).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Yield</p>
                  <p className="text-lg font-medium text-green-500">{userData.interestRate}%</p>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] rounded-lg font-medium transition-colors">
              View Offer
            </button>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-[#141414] border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium mb-2">Investment Security</h4>
              <p className="text-sm text-gray-400">
                All student data is verified on-chain. Credit lines are backed by on-chain
                collateral and Stellar smart contract enforcement. Default risk is calculated using AI
                models trained on historical payment data.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

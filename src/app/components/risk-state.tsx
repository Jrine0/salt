import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertTriangle, XCircle, CreditCard, TrendingDown, Clock } from 'lucide-react';

// Mock data for risk state
const riskData = {
  trustScore: 4520,
  level: 2,
  warningsCount: 2,
  missedPayments: 2,
  daysOverdue: 15,
  suspendedPerks: ['Amazon 12% discount', 'MakeMyTrip premium perks', 'Priority support'],
  outstandingBalance: 12500,
  minimumPayment: 5000,
};

export function RiskState() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Critical Alert Header */}
      <div className="bg-red-500/10 border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <h1 className="text-xl font-medium text-red-400">Account at Risk</h1>
              <p className="text-sm text-red-400/80">
                Immediate action required to restore your trust
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Main Warning Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/5 border-2 border-red-500/30 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center shrink-0">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-light mb-2">Maximum Warnings Reached</h2>
              <p className="text-red-400/80">
                You have {riskData.warningsCount} payment warnings. All perks are currently
                suspended until payments are up to date.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-red-500/20">
            <div>
              <p className="text-xs text-gray-500 mb-1">Missed Payments</p>
              <p className="text-2xl font-light text-red-400">{riskData.missedPayments}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Days Overdue</p>
              <p className="text-2xl font-light text-red-400">{riskData.daysOverdue}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Score Impact</p>
              <p className="text-2xl font-light text-red-400">-725</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Suspended Perks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-light">Suspended Perks</h3>
            </div>
            <div className="space-y-3">
              {riskData.suspendedPerks.map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-lg"
                >
                  <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-sm text-red-400">{perk}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              These perks will be restored once you make the required payment
            </p>
          </motion.div>

          {/* Immediate Action Required */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-light">Immediate Action</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Outstanding Balance</p>
                <p className="text-3xl font-light text-red-400">
                  ₹{riskData.outstandingBalance.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Minimum Payment Required</p>
                <p className="text-2xl font-light">₹{riskData.minimumPayment.toLocaleString()}</p>
              </div>
              <Link
                to="/payments"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#0066FF] hover:bg-[#0052CC] rounded-lg font-medium transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                Make Payment Now
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Score Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141414] border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-light">Score Impact</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <span className="text-gray-400">Previous Score</span>
              <span className="text-lg">5,245</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <span className="text-gray-400">Current Score</span>
              <span className="text-lg text-red-400">{riskData.trustScore}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Score Decrease</span>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-lg text-red-400">-725</span>
              </div>
            </div>
          </div>

          {/* Badge Status Change */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-400 font-medium mb-1">Level Downgrade Warning</p>
                <p className="text-xs text-yellow-400/80">
                  If payment is not received within 7 days, your level may be downgraded from
                  Level {riskData.level} to Level {riskData.level - 1}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recovery Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
        >
          <h3 className="text-xl font-light mb-6">Path to Recovery</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 flex items-center justify-center shrink-0 mt-1">
                <span className="text-sm font-medium text-[#0066FF]">1</span>
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1">Make Minimum Payment</p>
                <p className="text-sm text-gray-400">
                  Pay at least ₹{riskData.minimumPayment.toLocaleString()} to clear warnings
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0 mt-1">
                <span className="text-sm font-medium text-gray-400">2</span>
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1 text-gray-400">Perks Restored</p>
                <p className="text-sm text-gray-500">
                  All suspended perks will be immediately reactivated
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0 mt-1">
                <span className="text-sm font-medium text-gray-400">3</span>
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1 text-gray-400">Score Recovery</p>
                <p className="text-sm text-gray-500">
                  Continue on-time payments to rebuild your trust score
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-400 mb-2">Need help?</p>
          <button className="text-[#0066FF] hover:underline text-sm">
            Contact Support Team
          </button>
        </motion.div>
      </div>
    </div>
  );
}

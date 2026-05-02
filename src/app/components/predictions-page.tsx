import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Calendar, Target, Zap } from 'lucide-react';
import { userData, predictions } from '@/app/utils/mockData';

export function PredictionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-light">Future Predictions</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-light mb-3">Your Path to {predictions.nextLevel.name}</h2>
          <p className="text-gray-400">
            AI-powered forecast based on your payment behavior and score trajectory
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Main Prediction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-linear-to-br from-[#0066FF]/10 to-transparent border border-[#0066FF]/30 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#0066FF]/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-[#0066FF]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Next Level</p>
                <p className="text-xl font-medium">Level {predictions.nextLevel.level}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Estimated Time</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light">{predictions.nextLevel.estimatedDays}</span>
                  <span className="text-gray-400">days</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">Confidence</p>
                  <p className="text-sm font-medium">{predictions.nextLevel.confidenceScore}%</p>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${predictions.nextLevel.confidenceScore}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full bg-[#0066FF] rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Current Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
          >
            <h3 className="font-medium mb-6">Current Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <span className="text-sm text-gray-400">Trust Score</span>
                <span className="text-lg font-light">{userData.trustScore}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <span className="text-sm text-gray-400">Points to Next Level</span>
                <span className="text-lg font-light text-[#0066FF]">
                  {10000 - userData.trustScore}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Current Level</span>
                <span className="text-lg font-light">Level {userData.level}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Required Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141414] border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-[#0066FF]" />
            <h3 className="text-xl font-light">Required Actions</h3>
          </div>
          <div className="space-y-3">
            {predictions.nextLevel.requiredActions.map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-lg border border-gray-800"
              >
                <div className="w-6 h-6 rounded-full bg-[#0066FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs text-[#0066FF] font-medium">{i + 1}</span>
                </div>
                <p className="text-gray-300">{action}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-gray-400" />
            <h3 className="text-xl font-light">Timeline Forecast</h3>
          </div>

          <div className="space-y-6">
            <div className="relative pl-8 pb-6 border-l-2 border-gray-800 last:border-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-[#0a0a0a]" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Today</p>
                <p className="font-medium">Continue current payment pattern</p>
              </div>
            </div>

            <div className="relative pl-8 pb-6 border-l-2 border-gray-800 last:border-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0066FF] border-4 border-[#0a0a0a]" />
              <div>
                <p className="text-sm text-gray-500 mb-1">In 15 days</p>
                <p className="font-medium">First on-time payment milestone</p>
                <p className="text-sm text-gray-400 mt-1">Expected score: ~7,500</p>
              </div>
            </div>

            <div className="relative pl-8 pb-6 border-l-2 border-gray-800 last:border-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0066FF] border-4 border-[#0a0a0a]" />
              <div>
                <p className="text-sm text-gray-500 mb-1">In 30 days</p>
                <p className="font-medium">Second payment completed</p>
                <p className="text-sm text-gray-400 mt-1">Expected score: ~7,800</p>
              </div>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#F59E0B] border-4 border-[#0a0a0a] animate-pulse" />
              <div>
                <p className="text-sm text-gray-500 mb-1">In 45 days</p>
                <p className="font-medium text-[#F59E0B]">Projected Level 4 Achievement</p>
                <p className="text-sm text-gray-400 mt-1">Expected score: ~8,100+</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-[#141414] border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium mb-2">How Predictions Work</h4>
              <p className="text-sm text-gray-400">
                Our AI model analyzes your payment history, consistency, and behavior patterns to
                forecast your trust score growth. Predictions are updated in real-time based
                on your actions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

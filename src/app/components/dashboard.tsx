import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { TrendingUp, Gift, CreditCard, BarChart3, ArrowRight, CheckCircle2, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { levels } from '@/app/utils/mockData';

export function Dashboard() {
  const { state, logout } = useApp();
  const user = state.user;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const currentLevel = levels.find(l => l.level === user.level)!;
  const nextLevel = levels.find(l => l.level === user.level + 1)!;
  const progressToNextLevel =
    ((user.trustScore - currentLevel.minScore) /
      (nextLevel.minScore - currentLevel.minScore)) *
    100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light">OnChain Rewards</h1>
            <div className="flex items-center gap-6">
              <Link to="/levels" className="text-sm text-gray-400 hover:text-white transition-colors">
                Levels
              </Link>
              <Link to="/rewards" className="text-sm text-gray-400 hover:text-white transition-colors">
                Rewards
              </Link>
              <Link
                to="/history"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                History
              </Link>
              <Link
                to="/payments"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Payments
              </Link>
              <Link
                to="/predictions"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Predictions
              </Link>
              <Link
                to="/investor"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Investor View
              </Link>
              <Link
                to="/risk"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Risk Demo
              </Link>
<button
                onClick={handleLogout}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-light mb-2">Welcome back, {user.name.split(' ')[0]}</h2>
          <p className="text-gray-400">Here's your trust overview</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Main Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-[#141414] border border-gray-800 rounded-2xl p-8"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-2">Trust Score</p>
                <div className="flex items-baseline gap-3">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl font-light"
                  >
                    {user.trustScore.toLocaleString()}
                  </motion.span>
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>+125</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">Verified</span>
              </div>
            </div>

            {/* Level Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: `${currentLevel.color}15`,
                  borderColor: `${currentLevel.color}40`,
                }}
              >
                <span className="text-sm font-medium" style={{ color: currentLevel.color }}>
                  Level {currentLevel.level} • {currentLevel.name}
                </span>
              </div>
            </div>

            {/* Progress to Next Level */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Progress to Level {nextLevel.level}</p>
                <p className="text-sm text-gray-400">
                  {nextLevel.minScore - user.trustScore} points to go
                </p>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-[#0066FF] rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Link
              to="/payments"
              className="block bg-[#0066FF] hover:bg-[#0052CC] rounded-xl p-6 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="w-6 h-6" />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-medium mb-1">Pay Now</p>
              <p className="text-sm text-blue-200">Outstanding: ₹{user.outstandingBalance.toLocaleString()}</p>
            </Link>

            <Link
              to="/rewards"
              className="block bg-[#141414] hover:bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <Gift className="w-6 h-6" />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-medium mb-1">Redeem Rewards</p>
              <p className="text-sm text-gray-400">{user.rewardPoints.toLocaleString()} points available</p>
            </Link>
          </motion.div>
        </div>

        {/* Recent Activity & Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Credit Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#141414] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Credit Line</h3>
              <Link to="/payments" className="text-sm text-[#0066FF] hover:underline">
                View details
              </Link>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Available Credit</p>
                <p className="text-2xl font-light">
                  ₹{(user.creditLine - user.outstandingBalance).toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                  <p className="text-lg">{user.interestRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Limit</p>
                  <p className="text-lg">₹{user.creditLine.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Score Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#141414] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Score Trend</h3>
              <Link to="/history" className="text-sm text-[#0066FF] hover:underline">
                View analytics
              </Link>
            </div>
            <div className="flex items-end gap-2 h-24">
              {[6200, 6500, 6800, 7100, user.trustScore].map((score, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(score / 10000) * 100}%` }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="w-full bg-[#0066FF] rounded-t"
                  />
                  <p className="text-xs text-gray-500">{'Sep Oct Nov Dec Jan'.split(' ')[i]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
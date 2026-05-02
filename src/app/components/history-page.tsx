import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { userData, scoreHistory, paymentHistory, behaviorMetrics } from '@/app/utils/mockData';

export function HistoryPage() {
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
            <h1 className="text-2xl font-light">Trust History & Analytics</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Score Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141414] border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light mb-2">Score Progression</h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Last 5 months</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-500">
              <TrendingUp className="w-5 h-5" />
              <span className="text-lg font-medium">+1,045 points</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scoreHistory}>
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                tick={{ fill: '#9CA3AF' }}
                tickLine={false}
              />
              <YAxis
                stroke="#6B7280"
                tick={{ fill: '#9CA3AF' }}
                tickLine={false}
                domain={[5000, 8000]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0066FF"
                strokeWidth={3}
                dot={{ fill: '#0066FF', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Behavioral Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {Object.entries(behaviorMetrics).map(([key, value], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="bg-[#141414] border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
              <p className="text-3xl font-light mb-1">{value}%</p>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className="h-full bg-[#0066FF] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141414] border border-gray-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-light mb-6">Payment Timeline</h2>
          <div className="space-y-4">
            {paymentHistory.map((payment, i) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-4 pb-4 border-b border-gray-800 last:border-0"
              >
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    payment.type === 'on-time' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                />
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">{payment.date}</p>
                    <p className="text-xs text-gray-500">{payment.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">₹{payment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        payment.type === 'on-time'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="capitalize">{payment.type.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Verification Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-[#141414] border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-2">Stellar Verification</h4>
              <p className="text-sm text-gray-400 mb-3">
                All metrics are verified on-chain and immutably recorded on Stellar Testnet.
              </p>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-[#0a0a0a] px-2 py-1 rounded text-gray-500">
                  {userData.walletAddress}
                </code>
                <button className="text-xs text-[#0066FF] hover:underline">
                  View on Stellar Expert
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

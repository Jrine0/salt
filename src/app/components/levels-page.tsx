import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { levels } from '@/app/utils/mockData';

export function LevelsPage() {
  const { state } = useApp();
  const user = state.user;

  if (!user || !user.name || state.isLoading) {
    return <div>Loading...</div>;
  }

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
            <h1 className="text-2xl font-light">Level Badges & Perks</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Unlock exclusive perks as you build your trust score
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#141414] border border-gray-800 rounded-lg">
            <span className="text-sm text-gray-400">Current Score:</span>
            <span className="text-xl font-light">{user.trustScore}</span>
          </div>
        </motion.div>

        {/* Level Ladder */}
        <div className="space-y-4">
          {[...levels].reverse().map((level, i) => {
            const isUnlocked = user.trustScore >= level.minScore;
            const isCurrent = user.level === level.level;
            const delay = i * 0.1;

            return (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay }}
                className={`relative border rounded-2xl p-6 transition-all ${
                  isCurrent
                    ? 'bg-[#0066FF]/10 border-[#0066FF]'
                    : isUnlocked
                    ? 'bg-[#141414] border-gray-800 hover:border-gray-700'
                    : 'bg-[#0a0a0a] border-gray-800/50 opacity-60'
                }`}
              >
                {/* Level Badge Indicator (Danger State) */}
                {isCurrent && user.warningsCount > 0 && (
                  <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500">At Risk ({user.warningsCount}/2)</span>
                  </div>
                )}

                <div className="flex items-start gap-6">
                  {/* Level Number */}
                  <div
                    className="shrink-0 w-16 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-light"
                    style={{
                      backgroundColor: isUnlocked ? `${level.color}15` : 'transparent',
                      borderColor: isUnlocked ? level.color : '#374151',
                      color: isUnlocked ? level.color : '#6B7280',
                    }}
                  >
                    {level.level}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-light">{level.name}</h3>
                      {isCurrent && (
                        <div className="px-2 py-1 bg-[#0066FF] rounded text-xs">Current</div>
                      )}
                      {isUnlocked && !isCurrent && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {!isUnlocked && <Lock className="w-5 h-5 text-gray-600" />}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-sm text-gray-400">
                        {level.minScore.toLocaleString()} -{' '}
                        {level.maxScore === Infinity ? '∞' : level.maxScore.toLocaleString()} points
                      </p>
                      {!isUnlocked && (
                        <p className="text-sm text-gray-500">
                          {level.minScore - user.trustScore} points to unlock
                        </p>
                      )}
                    </div>

                    {/* Perks */}
                    <div className="grid md:grid-cols-2 gap-2">
                      {level.perks.map((perk) => (
                        <div
                          key={perk}
                          className={`flex items-start gap-2 text-sm ${
                            isUnlocked ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isUnlocked ? 'text-green-500' : 'text-gray-600'
                            }`}
                          />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-[#141414] border border-gray-800 rounded-xl p-6"
        >
          <h4 className="font-medium mb-3">How to Level Up</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Make consistent on-time payments to increase your score</li>
            <li>• Maintain low credit utilization (below 40% recommended)</li>
            <li>• Avoid missed payments - each warning reduces your score</li>
            <li>• Maximum 2 warnings allowed before perks are suspended</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

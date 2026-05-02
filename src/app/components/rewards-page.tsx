import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { rewards } from '@/app/utils/mockData';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { toast } from 'sonner';

export function RewardsPage() {
  const { state, redeemReward } = useApp();
  const user = state.user;
  const [redeemedRewards, setRedeemedRewards] = useState<Set<string>>(new Set());
  const [processing, setProcessing] = useState<Set<string>>(new Set());

if (!user || !user.name || state.isLoading) {
    return <div>Loading...</div>;
  }

const handleRedeem = async (rewardId: string, reward: any) => {
    if (user.rewardPoints < reward.minPoints) {
      toast.error('Insufficient reward points');
      return;
    }

    setProcessing(prev => new Set(prev).add(rewardId));

    try {
      // Simulate processing for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Deduct points using the context function
      const success = await redeemReward(rewardId, reward.minPoints);
      
      if (success) {
        setRedeemedRewards(prev => new Set(prev).add(rewardId));
        toast.success('Reward redeemed successfully! Check your email for the redemption code.');
      } else {
        toast.error('Redemption failed');
      }
    } catch (error) {
      console.error('Redemption error:', error);
      toast.error('Redemption failed. Please try again.');
    } finally {
      setProcessing(prev => {
        const newSet = new Set(prev);
        newSet.delete(rewardId);
        return newSet;
      });
    }
  };

  const availableRewards = rewards.filter(r => r.minScore <= user.trustScore);
  const lockedRewards = rewards.filter(r => r.minScore > user.trustScore);

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
            <h1 className="text-2xl font-light">Rewards Marketplace</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-light mb-3">Your Rewards</h2>
          <p className="text-gray-400">
            Instant redemption with your current trust score of{' '}
            <span className="text-white font-medium">{user.trustScore}</span> and{' '}
            <span className="text-white font-medium">{user.rewardPoints} reward points</span>
          </p>
        </motion.div>

        {/* Available Rewards */}
        <div className="mb-12">
          <h3 className="text-xl font-light mb-6">Available Now</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {availableRewards.map((reward, i) => {
              const isRedeemed = redeemedRewards.has(reward.id);
              const isProcessing = processing.has(reward.id);
              const canRedeem = user.rewardPoints >= reward.minPoints && !isRedeemed;

              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-[#141414] border rounded-xl overflow-hidden transition-colors group ${
                    isRedeemed 
                      ? 'border-green-500/50 opacity-75' 
                      : canRedeem 
                        ? 'border-gray-800 hover:border-[#0066FF]' 
                        : 'border-gray-800/50 opacity-60'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={reward.image}
                      alt={reward.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isRedeemed ? 'grayscale' : 'group-hover:scale-105'
                      }`}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg text-sm">
                      {reward.partner}
                    </div>
                    {isRedeemed && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/90 rounded-lg text-sm">
                        <CheckCircle2 className="w-4 h-4 inline mr-1" />
                        Redeemed
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-medium mb-2">{reward.title}</h4>
                    <p className="text-gray-400 mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">
                          Min. score: {reward.minScore.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Cost: {reward.minPoints || 1000} points
                        </div>
                      </div>
                      <button
                        onClick={() => handleRedeem(reward.id, reward)}
                        disabled={!canRedeem || isProcessing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isRedeemed
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            : canRedeem
                              ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white'
                              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isProcessing ? 'Processing...' : isRedeemed ? 'Redeemed' : 'Redeem Now'}
                        {!isRedeemed && canRedeem && <ExternalLink className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Locked Rewards */}
        <div>
          <h3 className="text-xl font-light mb-6">Unlock with Higher Score</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {lockedRewards.map((reward, i) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-[#141414] border border-gray-800 rounded-xl overflow-hidden opacity-60"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="text-center">
                      <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-300">
                        {reward.minScore - user.trustScore} points to unlock
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg text-sm">
                    {reward.partner}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-medium mb-2">{reward.title}</h4>
                  <p className="text-gray-400 mb-4">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Requires: {reward.minScore.toLocaleString()} points
                    </div>
                    <Link
                      to="/levels"
                      className="text-sm text-[#0066FF] hover:underline"
                    >
                      View level details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reward Points Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-[#141414] border border-gray-800 rounded-xl p-6"
        >
          <h4 className="font-medium mb-3">Your Reward Points</h4>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-light">{user.rewardPoints.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Available points</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Earn more points by making</p>
              <p className="text-sm font-medium">on-time payments</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Points are earned based on payment behavior: Early payments earn 2x points, on-time payments earn 1x points, and late payments earn 0.5x points.
          </div>
        </motion.div>

        {/* Partner Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-[#141414] border border-gray-800 rounded-xl p-6"
        >
          <h4 className="font-medium mb-3">How Redemption Works</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Rewards are instantly available based on your trust score</li>
            <li>• Each reward has a minimum score requirement and points cost</li>
            <li>• Redemption codes are sent to your registered email</li>
            <li>• All rewards are verified on-chain for transparency</li>
            <li>• Points are deducted immediately upon successful redemption</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
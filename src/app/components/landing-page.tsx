import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, TrendingUp, Gift, CheckCircle2, ArrowRight, Wallet } from 'lucide-react';
import {WalletConnectButton} from './WalletConnectButton'

const features = [
  {
    icon: Shield,
    title: 'Verify Behavior',
    description: 'Secure on-chain verification of your financial activities',
  },
  {
    icon: TrendingUp,
    title: 'Build Score',
    description: 'Increase your trust with consistent on-time payments',
  },
  {
    icon: Gift,
    title: 'Earn Rewards',
    description: 'Unlock real perks with Amazon, MakeMyTrip, and more',
  },
];

const partners = [
  { name: 'Amazon', discount: 'Up to 15% off' },
  { name: 'MakeMyTrip', discount: 'Exclusive travel deals' },
];

export function LandingPage() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-7xl font-light tracking-tight mb-6">
              Your Trust.
              <br />
              <span className="text-[#0066FF]">On-Chain.</span>
              <br />
              Rewarded in Real Time.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Build financial trust through verified on-chain behavior. Access instant
              rewards from trusted partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                state={{ showEmailForm: true }}
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-4 rounded-lg transition-colors text-lg font-medium"
              >
                Start Building Trust
                <ArrowRight className="w-5 h-5" />
              </Link>
              <WalletConnectButton className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
                <span className="font-medium">Connect Wallet</span>
              </WalletConnectButton>
            </div>
          </motion.div>

          {/* Live Trust Score Mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-20 max-w-2xl mx-auto"
          >
            <div className="bg-[#141414] border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Live Trust Score</p>
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-5xl font-light"
                    >
                      7,245
                    </motion.span>
                    <span className="text-green-500 text-sm">+125 this week</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">Verified on Stellar Testnet</span>
                </div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '72%' }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full bg-[#0066FF] rounded-full"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Level 3 • 2,755 points to Level 4</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-light text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#141414] border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-[#0066FF]/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partner Rewards */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-light text-center mb-16">Partner Rewards</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#141414] border border-gray-800 rounded-xl p-6"
            >
              <h3 className="text-2xl font-medium mb-2">{partner.name}</h3>
              <p className="text-gray-400">{partner.discount}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-800">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">Powered by</p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-gray-600">Stellar • Testnet</div>
          </div>
        </div>
      </div>
    </div>
  );
}

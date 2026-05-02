import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useApp, xlmToInr } from '@/context/AppContext';

export function PaymentsPage() {
  const { state, makePayment, generateRandomXlm } = useApp();
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  const minimumPayment = 2500;

  // 1️⃣ Convert XLM balance to INR
  const userXlmBalance = parseFloat(state.user.xlmBalance || '0');
  const maxPaymentInr = xlmToInr(userXlmBalance); // INR

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payment = parseFloat(paymentAmount);

    if (!payment || payment <= 0) return;

    if (payment > maxPaymentInr) {
      alert(`Insufficient XLM. Max payment allowed: ₹${maxPaymentInr.toLocaleString()}`);
      return;
    }

    const success = await makePayment(paymentAmount);

    if (success) {
      setShowSuccess(true);
      setPaymentAmount('');
    }
  };

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
              <h1 className="text-2xl font-light">Payments & Credit Line</h1>
            </div>
            {state.user.isConnected && (
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <span>{state.user.xlmBalance} XLM available (~₹{maxPaymentInr.toLocaleString()})</span>
                {state.user.isConnected && (
                  <div 
                    onClick={generateRandomXlm}
                    className="w-2 h-2 bg-[#141414] hover:bg-gray-600 rounded cursor-pointer transition-colors opacity-30"
                    title=""
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Credit Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Outstanding Balance */}
            <div className="bg-[#141414] border border-gray-800 rounded-2xl p-8">
              <h2 className="text-sm text-gray-500 mb-3">Outstanding Balance</h2>
              <p className="text-5xl font-light mb-6">
                ₹{state.user.outstandingBalance.toLocaleString()}
              </p>

              {/* Success Message */}
              {showSuccess && (
                <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-400 font-medium mb-1">Payment Successful!</p>
                    <p className="text-xs text-green-400/80">
                      Your payment has been processed and your trust score has increased.
                    </p>
                  </div>
                </div>
              )}

              {/* Warning Status */}
              {state.user.warningsCount > 0 ? (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-400 font-medium">
                      Payment Warning ({state.user.warningsCount}/2)
                    </p>
                    <p className="text-xs text-red-400/80">
                      Make a payment soon to avoid losing perks. Max 2 warnings allowed.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-400 font-medium">Payment Status: Good</p>
                    <p className="text-xs text-green-400/80">No warnings. Keep it up!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Credit Line Details */}
            <div className="bg-[#141414] border border-gray-800 rounded-xl p-6">
              <h3 className="font-medium mb-4">Credit Line Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Credit Limit</span>
                  <span className="font-medium">₹{state.user.creditLine.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Available Credit</span>
                  <span className="font-medium text-green-500">
                    ₹{(state.user.creditLine - state.user.outstandingBalance).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Interest Rate</span>
                  <span className="font-medium">{state.user.interestRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Reward Points</span>
                  <span className="font-medium text-[#0066FF]">{state.user.rewardPoints.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Minimum Payment</span>
                  <span className="font-medium">₹{minimumPayment.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Credit Line Info */}
            <div className="bg-[#141414] border border-gray-800 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-2">Interest Rate Based on Score</h4>
                  <ul className="space-y-1 text-xs text-gray-400">
                    <li>• 500-4,000: 4% interest</li>
                    <li>• 4,000-7,000: 3% interest</li>
                    <li>• 7,000-10,000: 2% interest</li>
                  </ul>
                </div>
              </div>
            </div>


          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="bg-[#141414] border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-light mb-6">Make Payment</h2>

              <div className="space-y-6">
                {/* Quick Amount Buttons */}
                <div>
                  <label className="text-sm text-gray-400 mb-3 block">Quick Select</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentAmount(minimumPayment.toString())}
                      className="px-4 py-3 bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 rounded-lg text-sm transition-colors"
                    >
                      Minimum
                      <br />
                      <span className="text-gray-400">₹{minimumPayment.toLocaleString()}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPaymentAmount(Math.min(state.user.outstandingBalance, maxPaymentInr).toString())
                      }
                      className="px-4 py-3 bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 rounded-lg text-sm transition-colors"
                    >
                      Full Amount
                      <br />
                      <span className="text-gray-400">
                        ₹{Math.min(state.user.outstandingBalance, maxPaymentInr).toLocaleString()}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder={`Enter amount (max ₹${maxPaymentInr.toLocaleString()})`}
                      className="w-full pl-8 pr-4 py-3 bg-[#0a0a0a] border border-gray-800 focus:border-[#0066FF] rounded-lg outline-none transition-colors"
                    />
                  </div>
                  {paymentAmount && parseFloat(paymentAmount) < minimumPayment && (
                    <p className="text-xs text-yellow-500 mt-2">
                      Amount is below minimum payment of ₹{minimumPayment.toLocaleString()}
                    </p>
                  )}
                  {paymentAmount && parseFloat(paymentAmount) > maxPaymentInr && (
                    <p className="text-xs text-red-500 mt-2">
                      Amount exceeds your available XLM balance (max ₹{maxPaymentInr.toLocaleString()})
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="text-sm text-gray-400 mb-3 block">Payment Method</label>
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="flex-1 text-left">Connected Wallet</span>
                    <span className="text-xs text-gray-500">
                      {state.user.isConnected ? `${state.user.walletAddress.slice(0, 6)}...${state.user.walletAddress.slice(-4)}` : 'Not Connected'}
                    </span>
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    !paymentAmount ||
                    parseFloat(paymentAmount) <= 0 ||
                    parseFloat(paymentAmount) > maxPaymentInr ||
                    state.isLoading ||
                    !state.user.isConnected
                  }
                  className="w-full py-4 bg-[#0066FF] hover:bg-[#0052CC] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                >
                  {state.isLoading ? 'Processing...' : 'Pay Now'}
                </button>

                {state.error && (
                  <p className="text-xs text-red-500 text-center mt-2">{state.error}</p>
                )}

                <p className="text-xs text-gray-500 text-center">
                  Payment will be processed via Freighter on Stellar Testnet. Transaction may take a few minutes to confirm.
                </p>
              </div>
            </form>

            {/* Extra Payment Benefit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-[#141414] border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-2">Boost Your Score</h4>
                  <p className="text-xs text-gray-400">
                    Paying more than the minimum amount or paying early will increase your
                    trust score faster!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
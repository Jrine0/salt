import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Wallet, Mail, Shield, ArrowLeft, Eye, EyeOff, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { blockchainService } from '@/lib/blockchain';
import { toast } from 'sonner';

export function LoginPage() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup, connectWallet } = useApp();

  useEffect(() => {
    if (location.state?.showEmailForm) {
      setIsLogin(false);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          toast.success('Login successful!');
          navigate('/dashboard');
        } else {
          toast.error(result.message || 'Login failed');
        }
      } else {
        const result = await signup(name, email, password);
        if (result.success) {
          toast.success('Account created successfully!');
          navigate('/dashboard');
        } else {
          toast.error(result.message || 'Signup failed');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    try {
      const result = await blockchainService.connectWallet();
      if (result.address) {
        await blockchainService.ensureStellarTestnet();
        
        const connectResult = await connectWallet(result.address);
        if (connectResult.success) {
          toast.success('Wallet connected successfully!');
          navigate('/dashboard');
        } else {
          toast.error(connectResult.message || 'Wallet connection failed');
        }
      } else {
        toast.error('Failed to connect wallet');
      }
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light mb-3">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400">
            {isLogin ? 'Sign in to continue' : 'Join to start building trust'}
          </p>
        </div>

        {/* Wallet Login */}
        <button
          onClick={handleWalletConnect}
          className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-4 rounded-lg transition-colors mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5" />
              <span className="font-medium">Connect Wallet</span>
            </div>
            <span className="text-sm text-blue-200">Freighter</span>
          </div>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-800"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-gray-800 focus:border-[#0066FF] rounded-lg outline-none transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-gray-800 focus:border-[#0066FF] rounded-lg outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pr-12 pl-4 py-3 bg-[#141414] border border-gray-800 focus:border-[#0066FF] rounded-lg outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#141414] hover:bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#0066FF] hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Network Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Connected to Stellar Testnet</span>
        </div>

        {/* Privacy Message */}
        <div className="mt-8 bg-[#141414] border border-gray-800 rounded-lg p-4">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-gray-400 shrink-0" />
            <div>
              <p className="text-sm text-gray-300 mb-1">Your data is secure</p>
              <p className="text-xs text-gray-500">
                All trust metrics are verified on-chain and encrypted. We never share your
                personal information.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Landing */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AppProvider } from '@/context/AppContext';
import { LandingPage } from '@/app/components/landing-page';
import { LoginPage } from '@/app/components/login-page';
import { Dashboard } from '@/app/components/dashboard';
import { LevelsPage } from '@/app/components/levels-page';
import { RewardsPage } from '@/app/components/rewards-page';
import { HistoryPage } from '@/app/components/history-page';
import { PaymentsPage } from '@/app/components/payments-page';
import { PredictionsPage } from '@/app/components/predictions-page';
import { InvestorView } from '@/app/components/investor-view';
import { RiskState } from '@/app/components/risk-state';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/levels" element={<LevelsPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/predictions" element={<PredictionsPage />} />
      <Route path="/investor" element={<InvestorView />} />
      <Route path="/risk" element={<RiskState />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

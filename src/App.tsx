
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import CandidatesList from '@/pages/CandidatesList';
import CandidateDetail from '@/pages/CandidateDetail';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import CandidatePortal from '@/pages/CandidatePortal';
import CandidatePortalDetail from '@/pages/CandidatePortalDetail';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public/Candidate routes as main routes */}
          <Route path="/" element={<Navigate to="/index" replace />} />
          <Route path="/index" element={<Index />} />
          <Route path="/portal" element={<CandidatePortal />} />
          <Route path="/portal/candidate/:id" element={<CandidatePortalDetail />} />
          
          {/* Admin routes - with admin layout - now under /tableaudebord prefix */}
          <Route path="/tableaudebord" element={<Layout><Outlet /></Layout>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="candidates" element={<CandidatesList />} />
            <Route path="candidates/edit/:id" element={<CandidateDetail />} />
            <Route path="candidate/:id" element={<CandidateDetail />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Legacy redirects to maintain backward compatibility */}
          <Route path="/dashboard" element={<Navigate to="/tableaudebord" replace />} />
          <Route path="/admin" element={<Navigate to="/tableaudebord" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

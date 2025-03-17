import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
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
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="candidates" element={<CandidatesList />} />
            <Route path="candidates/edit/:id" element={<CandidateDetail />} />
            <Route path="candidate/:id" element={<CandidateDetail />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Portal routes - no layout wrapper */}
          <Route path="/portal" element={<CandidatePortal />} />
          <Route path="/portal/candidate/:id" element={<CandidatePortalDetail />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;


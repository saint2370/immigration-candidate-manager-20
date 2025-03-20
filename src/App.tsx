
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
import { LanguageProvider } from '@/contexts/LanguageContext';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* Public/Candidate routes */}
            <Route path="/" element={<Navigate to="/index" replace />} />
            <Route path="/index" element={<Index />} />
            <Route path="/portal" element={<CandidatePortal />} />
            <Route path="/portal/candidate/:id" element={<CandidatePortalDetail />} />
            
            {/* Admin routes - tableau de bord */}
            <Route path="/tableaudebord" element={<Layout><Outlet /></Layout>}>
              {/* Redirection par défaut vers le dashboard */}
              <Route index element={<Dashboard />} />
              
              {/* Routes du dashboard principal */}
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Routes de gestion des candidats */}
              <Route path="candidates" element={<CandidatesList />} />
              <Route path="candidate/:id" element={<CandidateDetail />} />
              <Route path="candidates/edit/:id" element={<CandidateDetail />} />
              <Route path="candidates/new" element={<CandidateDetail isNewCandidate={true} />} />
              
              {/* Routes des types de visa */}
              <Route path="work-visas" element={<CandidatesList filterByVisaType="Travail" />} />
              <Route path="visitor-visas" element={<CandidatesList filterByVisaType="Visiteur" />} />
              <Route path="permanent-residence" element={<CandidatesList filterByVisaType="Résidence Permanente" />} />
              
              {/* Routes des rapports et paramètres */}
              <Route path="calendar" element={<NotFound title="Calendrier" message="Cette fonctionnalité sera bientôt disponible" />} />
              <Route path="reports" element={<NotFound title="Rapports" message="Cette fonctionnalité sera bientôt disponible" />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Legacy redirects pour maintenir la compatibilité */}
            <Route path="/dashboard" element={<Navigate to="/tableaudebord" replace />} />
            <Route path="/admin" element={<Navigate to="/tableaudebord" replace />} />
            
            {/* Page 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;

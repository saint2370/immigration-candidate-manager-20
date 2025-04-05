
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
import SiteManagement from '@/pages/SiteManagement';
import StudentVisa from '@/pages/immigration/StudentVisa';
import WorkVisa from '@/pages/immigration/WorkVisa';
import PermanentResidence from '@/pages/immigration/PermanentResidence';
import NewImmigrationPrograms from '@/pages/immigration/NewImmigrationPrograms';

// New page imports
import ImmigrationPrograms from '@/pages/immigration/ImmigrationPrograms';
import FamilySponsorshipProgram from '@/pages/immigration/FamilySponsorshipProgram';
import RefugeesAsylum from '@/pages/immigration/RefugeesAsylum';
import VisitorVisa from '@/pages/immigration/VisitorVisa';
import FormsAndGuides from '@/pages/services/FormsAndGuides';
import NewcomerServices from '@/pages/services/NewcomerServices';
import BiometricAppointments from '@/pages/services/BiometricAppointments';
import ClientSupportCenter from '@/pages/resources/ClientSupportCenter';
import Publications from '@/pages/resources/Publications';
import OfficialGuides from '@/pages/resources/OfficialGuides';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* Public/Candidate routes as main routes */}
            <Route path="/" element={<Index />} />
            <Route path="/index" element={<Navigate to="/" replace />} />
            <Route path="/portal" element={<CandidatePortal />} />
            <Route path="/portal/candidate/:id" element={<CandidatePortalDetail />} />
            
            {/* Immigration Program Pages */}
            <Route path="/visa-etudiant" element={<StudentVisa />} />
            <Route path="/visa-travail" element={<WorkVisa />} />
            <Route path="/residence-permanente" element={<PermanentResidence />} />
            <Route path="/nouveaux-programmes" element={<NewImmigrationPrograms />} />
            <Route path="/programmes-immigration" element={<ImmigrationPrograms />} />
            <Route path="/parrainage-familial" element={<FamilySponsorshipProgram />} />
            <Route path="/refugies-asile" element={<RefugeesAsylum />} />
            <Route path="/visiter-canada" element={<VisitorVisa />} />
            
            {/* Services Pages */}
            <Route path="/formulaires-guides" element={<FormsAndGuides />} />
            <Route path="/services-nouveaux-arrivants" element={<NewcomerServices />} />
            <Route path="/rendez-vous-biometriques" element={<BiometricAppointments />} />
            
            {/* Resources Pages */}
            <Route path="/centre-soutien" element={<ClientSupportCenter />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/guides-officiels" element={<OfficialGuides />} />
            
            {/* Admin routes - with admin layout */}
            <Route path="/tableaudebord" element={<Layout><Outlet /></Layout>}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="candidates" element={<CandidatesList />} />
              <Route path="candidates/new" element={<CandidateDetail isNewCandidate={true} />} />
              <Route path="candidate/:id" element={<CandidateDetail />} />
              <Route path="candidates/edit/:id" element={<CandidateDetail />} />
              <Route path="settings" element={<Settings />} />
              <Route path="site-management" element={<SiteManagement />} />
            </Route>
            
            {/* Legacy redirects to maintain backward compatibility */}
            <Route path="/dashboard" element={<Navigate to="/tableaudebord" replace />} />
            <Route path="/admin" element={<Navigate to="/tableaudebord" replace />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;

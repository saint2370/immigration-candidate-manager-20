
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CandidatesList from "./pages/CandidatesList";
import CandidateDetail from "./pages/CandidateDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Protected routes with layout */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/candidates" element={<Layout><CandidatesList /></Layout>} />
          <Route path="/candidate/:id" element={<Layout><CandidateDetail /></Layout>} />
          <Route path="/candidates/edit/:id" element={<Layout><CandidateDetail /></Layout>} />
          <Route path="/work-visas" element={<Layout><CandidatesList /></Layout>} />
          <Route path="/visitor-visas" element={<Layout><CandidatesList /></Layout>} />
          <Route path="/permanent-residence" element={<Layout><CandidatesList /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          
          {/* Special measures routes */}
          <Route path="/special/haiti" element={<Layout><NotFound /></Layout>} />
          <Route path="/special/ukraine" element={<Layout><NotFound /></Layout>} />
          <Route path="/special/gaza" element={<Layout><NotFound /></Layout>} />
          <Route path="/special/all" element={<Layout><NotFound /></Layout>} />
          
          {/* Calendar and Reports routes */}
          <Route path="/calendar" element={<Layout><NotFound /></Layout>} />
          <Route path="/reports" element={<Layout><NotFound /></Layout>} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

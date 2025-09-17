import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Workspaces from "./pages/Workspaces";
import Projects from "./pages/Projects";
import ProjectView from "./pages/ProjectView";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Agency from "./pages/Agency";
import Orion from "./pages/Orion";
import Knowledge from "./pages/Knowledge";
import Integrations from "./pages/Integrations";
import Leads from "./pages/agency/Leads";
import Clients from "./pages/agency/Clients";
import Proposals from "./pages/agency/Proposals";
import ProposalEdit from "./pages/agency/ProposalEdit";
import Calendar from "./pages/agency/Calendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectView />} />
            <Route path="/agency" element={<Agency />} />
            <Route path="/agency/leads" element={<Leads />} />
            <Route path="/agency/clients" element={<Clients />} />
            <Route path="/agency/proposals" element={<Proposals />} />
            <Route path="/agency/proposals/:id" element={<ProposalEdit />} />
            <Route path="/agency/calendar" element={<Calendar />} />
            <Route path="/orion" element={<Orion />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

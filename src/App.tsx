import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Preview from "./pages/Preview";
import Assessments from "./pages/Assessments";
import PendingAssessments from "./pages/PendingAssessments";
import DivisionInfo from "./pages/DivisionInfo";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/ventureassessment/:slug" element={<Preview />} />
            <Route path="/division/:division" element={<DivisionInfo />} />
            
            {/* Protected routes - require staff role */}
            <Route path="/" element={
              <ProtectedRoute requireStaff>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/preview" element={
              <ProtectedRoute requireStaff>
                <Preview />
              </ProtectedRoute>
            } />
            <Route path="/assessments" element={
              <ProtectedRoute requireStaff>
                <Assessments />
              </ProtectedRoute>
            } />
            <Route path="/pending-assessments" element={
              <ProtectedRoute requireStaff>
                <PendingAssessments />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

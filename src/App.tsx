import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Appointments from "./pages/admin/Appointments";
import Patients from "./pages/admin/Patients";
import Prescriptions from "./pages/admin/Prescriptions";
import Billing from "./pages/admin/Billing";
import Staff from "./pages/admin/Staff";

function RequireAdminAuth({ children }: { children: React.ReactNode }) {
  const isAuth = sessionStorage.getItem("admin_auth") === "true";
  return isAuth ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Admin Routes — protected */}
          <Route path="/admin" element={<RequireAdminAuth><AdminLayout /></RequireAdminAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="patients" element={<Patients />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="billing" element={<Billing />} />
            <Route path="staff" element={<Staff />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

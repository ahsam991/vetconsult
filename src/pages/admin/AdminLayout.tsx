import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, LogOut } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/appointments": "Appointments",
  "/admin/patients": "Patients & Pets",
  "/admin/prescriptions": "Prescriptions",
  "/admin/billing": "Billing & Invoices",
  "/admin/staff": "Staff Management",
};

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[location.pathname] ?? "Admin";

  function handleLogout() {
    sessionStorage.removeItem("admin_auth");
    navigate("/admin/login");
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="h-14 flex items-center justify-between px-4 bg-card border-b border-border sticky top-0 z-30 gap-3">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="h-4 w-px bg-border hidden sm:block" />
              <h1 className="font-semibold text-foreground text-sm hidden sm:block">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden md:flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
                <input
                  placeholder="Search patients, appointments..."
                  className="pl-9 pr-4 py-1.5 text-sm bg-muted border border-border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
                />
              </div>
              <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
              </button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">A</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

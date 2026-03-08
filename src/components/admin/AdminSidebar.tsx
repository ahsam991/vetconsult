import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard, Calendar, Users, FileText, CreditCard,
  UserCog, PawPrint, LogOut, ChevronRight,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Appointments", url: "/admin/appointments", icon: Calendar },
  { title: "Patients & Pets", url: "/admin/patients", icon: PawPrint },
  { title: "Prescriptions", url: "/admin/prescriptions", icon: FileText },
  { title: "Billing & Invoices", url: "/admin/billing", icon: CreditCard },
  { title: "Staff Management", url: "/admin/staff", icon: UserCog },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <div className={`flex items-center gap-3 px-3 py-4 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <PawPrint className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold text-sm text-foreground leading-none">Vet Consult</div>
              <div className="text-xs text-muted-foreground mt-0.5">Admin Portal</div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "hidden" : ""}>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const active = location.pathname === item.url || (item.url !== "/admin" && location.pathname.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/admin"}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                          active
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                        activeClassName=""
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                        {!collapsed && active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <div className={`px-3 py-3 ${collapsed ? "flex justify-center" : ""}`}>
          <a
            href="/"
            className={`flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors ${collapsed ? "" : "w-full"}`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Back to Website</span>}
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

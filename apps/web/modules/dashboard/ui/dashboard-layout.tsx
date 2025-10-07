import { AuthGuard } from "@/modules/auth/ui/components/auth-gurad";
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { DashboardSidebar } from "../components/dashboard-sidebar";

type DashboardLayoutPros = {
  children: ReactNode;
};

export const DashboardLayout = async ({ children }: DashboardLayoutPros) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AuthGuard>
      <OrganizationGuard>
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashboardSidebar />
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  );
};

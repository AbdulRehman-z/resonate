import { DashboardLayout } from "@/modules/dashboard/ui/dashboard-layout";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;

"use client";

import { useOrganization } from "@clerk/nextjs";
import { ReactNode } from "react";
import { AuthLayout } from "../layouts/auth-layout";
import { OrganizationSelectionView } from "../views/org-selection-view";

export const OrganizationGuard = ({ children }: { children: ReactNode }) => {
  const organization = useOrganization();

  if (!organization) {
    return (
      <AuthLayout>
        <OrganizationSelectionView />
      </AuthLayout>
    );
  }

  return <>{children}</>;
};

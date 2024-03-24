"use client";

import { AuthProvider } from "./auth_provider";
import { UserProfileInfoProvider } from "./user_profile_info_provider";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <UserProfileInfoProvider>{children}</UserProfileInfoProvider>
    </AuthProvider>
  );
}

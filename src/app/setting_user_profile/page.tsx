"use client";

import { Create_user_profile_form } from "@/app/setting_user_profile/components/create_user_profile_form";
import { Setting_user_profile_provider } from "@/app/components/provider/setting_user_profile_context";
import { UserProfileInfoProvider } from "@/app/components/provider/user_profile_info_provider";
import { AuthProvider } from "@/app/components/provider/auth_provider";

export default function Setting_user_profile() {
  return (
    <AuthProvider>
      <UserProfileInfoProvider>
        <Setting_user_profile_provider>
          <Create_user_profile_form />
        </Setting_user_profile_provider>
      </UserProfileInfoProvider>
    </AuthProvider>
  );
}

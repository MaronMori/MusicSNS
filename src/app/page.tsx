"use client";

import { useEffect, useState } from "react";
import { AuthProvider } from "./components/provider/auth_provider";
import { UserProfileInfoProvider } from "./components/provider/user_profile_info_provider";
import { MainPageComponent } from "@/app/components/mainPageComponent";
import { useSearchParams } from "next/navigation";
import { ManageSongPlayerProvider } from "@/app/components/provider/manage_song_player";

export default function Home() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    setCode(code);
  }, [searchParams]);

  return (
    <AuthProvider>
      <UserProfileInfoProvider>
        <ManageSongPlayerProvider>
          <MainPageComponent code={code} />
        </ManageSongPlayerProvider>
      </UserProfileInfoProvider>
    </AuthProvider>
  );
}

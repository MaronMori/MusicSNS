"use client"

import {Menu_section} from "./components/main_page_sections_/menu_section/menu_section";
import {Post_timeline_section} from "./components/main_page_sections_/post_timeline_section/post_timeline_section";
import {Post_modal_page} from "./components/post_modal_page/post_modal_page";
import {useEffect, useState} from "react";
import {AuthProvider} from "./components/provider/auth_provider";
import {UserProfileImageProvider} from "./components/provider/user_profile_image";
import {SessionProvider} from "next-auth/react";
import {MainPageComponent} from "@/app/components/mainPageComponent";
import {useRouter, useSearchParams} from "next/navigation";

export default function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [code, setCode] = useState("")

    useEffect(() => {
        const code = searchParams.get("code")
        setCode(code)
    }, [searchParams]);

  return (
      <AuthProvider>
              <UserProfileImageProvider>
                  <MainPageComponent code={code}/>
              </UserProfileImageProvider>
      </AuthProvider>
  )
}

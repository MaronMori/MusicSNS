"use client";

import { useState } from "react";
import { Menu_section } from "@/app/components/main_page_sections_/menu_section/menu_section";
import { Post_modal_page } from "@/app/components/post_modal_page/post_modal_page";
import { Settings_section } from "@/app/settings/components/settings_section";
import { AuthProvider } from "@/app/components/provider/auth_provider";
import { UserProfileImageProvider } from "@/app/components/provider/user_profile_image";

export default function Settings() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <AuthProvider>
      <UserProfileImageProvider>
        <main>
          <div className="flex flex-col-reverse md:grid grid-cols-3">
            <div
              className={
                "fixed z-50 bottom-0 md:static w-full md:shadow-none shadow-2xl"
              }
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <Menu_section ifTimeline={false} openModal={openModal} />
            </div>
            <Settings_section />
            <section className="container"></section>
            <Post_modal_page show={showModal} onClose={closeModal} />
          </div>
        </main>
      </UserProfileImageProvider>
    </AuthProvider>
  );
}
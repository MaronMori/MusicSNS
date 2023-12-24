"use client"

import {Menu_section} from "@/app/components/main_page_sections_/menu_section/menu_section";
import {useState} from "react";
import {Post_timeline_section} from "@/app/components/main_page_sections_/post_timeline_section/post_timeline_section";
import {Post_modal_page} from "@/app/components/post_modal_page/post_modal_page";
import {Search_timeline} from "@/app/search/components/search_timeline";
import {UserProfileImageProvider} from "@/app/components/provider/user_profile_image";
import {AuthProvider} from "@/app/components/provider/auth_provider";

export default function Search() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


    return (
        <AuthProvider>
            <UserProfileImageProvider>
                <main>
                    <div className="grid grid-cols-3">
                        <Menu_section onClose={closeModal} openModal={openModal}/>
                        <Search_timeline />
                        <section className="container"></section>
                        <Post_modal_page show={showModal} onClose={closeModal}/>
                    </div>
                </main>
            </UserProfileImageProvider>
        </AuthProvider>
    )
}
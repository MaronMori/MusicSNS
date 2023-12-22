"use client"

import {Menu_section} from "@/app/main_page_sections_/menu_section/menu_section";
import {Post_timeline_section} from "@/app/main_page_sections_/post_timeline_section/post_timeline_section";
import {Post_modal_page} from "@/app/post_modal_page/post_modal_page";
import {useState} from "react";
import {AuthProvider} from "@/app/provider/auth_provider";

export default function Home() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


  return (
          <main>
              <div className="grid grid-cols-3">
                  <Menu_section onClose={closeModal} openModal={openModal}/>
                  <Post_timeline_section />
                  <section className="container"></section>
                  <Post_modal_page show={showModal} onClose={closeModal}/>
              </div>
          </main>
  )
}

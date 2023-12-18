"use client"

import {Menu} from "@/app/components/menu";
import {Posts} from "@/app/components/posts";
import {Post_modal} from "@/app/post_page/page";
import {useState} from "react";

export default function Home() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

  return (
    <main>
        <div className="grid grid-cols-3">
            <Menu />
            <Posts />
            <section className="container">iii</section>
            <button onClick={openModal}>Open Modal</button>
            <Post_modal show={showModal} onClose={closeModal}/>
        </div>
    </main>
  )
}

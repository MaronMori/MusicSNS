import { doc, updateDoc, increment } from "firebase/firestore";
import {firestore} from "../../../../../../lib/FirebaseConfig";
import {useEffect, useState} from "react";
import {faComment, faHeart, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toggleLike} from "@/app/components/main_page_sections_/post_timeline_section/components/functions/utils";
import {Post_header} from "@/app/components/main_page_sections_/post_timeline_section/components/components/post_header";
import {Post_content} from "@/app/components/main_page_sections_/post_timeline_section/components/components/post_content";
import {Post_picture} from "@/app/components/main_page_sections_/post_timeline_section/components/components/post_picture";
import {Post_footer} from "@/app/components/main_page_sections_/post_timeline_section/components/components/post_footer";
import {Post} from "@/app/components/main_page_sections_/post_timeline_section/components/components/post";

export const Post_timeline = ({ posts }) => {



    return(
        <div className="post_tilmeline flex flex-col">
            {posts.map((post) => (
                <Post post={post}/>
            ))}
        </div>
    )
}
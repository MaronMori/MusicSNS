import {Post_header} from "@/app/components/post/post_header";
import {Post_actions} from "@/app/components/post/post_actions";
import {Post_picture} from "@/app/components/post/Post_picture";
import {Post_description} from "@/app/components/post/post_description";
import {More_read_button} from "@/app/components/post/more_read_button";
import {collection, getDocs, query, orderBy, doc} from "firebase/firestore";
import {firestore} from "../../../../lib/FirebaseConfig";
import {useEffect, useState} from "react";



export const Post_timeline = ({ posts }) => {


    return(
        <div className="flex flex-col">
            {posts.map((post) => (
                <div id={post.id}>
                    <div>
                        <div className={"w-3 h-3"}><img src={post.userProfileImage} alt={"UserProfileImage"}/></div>
                        <p>{post.username}</p>
                        <p>{post.create}</p>
                    </div>
                    <div>{post.text}</div>
                    {post.image && <img src={post.image} alt={"PostImage"}/>}
                </div>
            ))}
        </div>
    )
}
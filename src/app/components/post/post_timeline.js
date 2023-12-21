import { doc, updateDoc, increment } from "firebase/firestore";
import {firestore} from "../../../../lib/FirebaseConfig";
import {useEffect, useState} from "react";
import {faComment, faHeart, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


// function to count likes
const toggleLike = async (postId, liked) =>{
    // reference to update count of like
    const postRef = doc(firestore, "posts" ,postId);

    // increase like or not
    const likeIncrement = liked ? increment(-1) : increment(1);

    // update firestore document
    await updateDoc(postRef, {
    likesCount : likeIncrement
    })
}


export const Post_timeline = ({ posts }) => {
    const [likedPosts, setLikedPosts ] = useState({});

    const handleLike = async (postId) => {
        // if the post doesn't have like yet(undefined), it will be false as default value.
        const liked = likedPosts[postId] || false;
        // this ...likedPosts is posts that is already liked
        // !liked switch like or unlike
        setLikedPosts({...likedPosts, [postId]: !liked})
        await toggleLike(postId, liked);
    }

    return(
        <div className="flex flex-col">
            {posts.map((post) => (
                <div id={post.id} className={"border border-black"}>
                    <div className={"post_header flex p-2"}>
                        <div className={"w-12 h-12 flex-none"}>
                            <img src={post.userProfileImage} className={"rounded-full"} alt={"UserProfileImage"}/>
                        </div>
                        <div className={"flex flex-auto justify-between items-center px-2"}>
                            <div className={"font-bold"}>
                                <p>{post.username}</p>
                            </div>
                            <div>
                                <p>{post.create}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"py-2 px-3"}>
                        <p>{post.text}</p>
                    </div>
                    {post.image && <img src={post.image} alt={"PostImage"}/>}
                    <div className={"post_footer"}>
                        <div className={"px-2 pb-1 icons grid-cols-2 space-x-2"}>
                            <button onClick={() => handleLike(post.id)}>
                                <FontAwesomeIcon icon={faStar} style={{
                                    color: likedPosts[post.id] ? '#ff4500' : '#ccc',
                                    transition: 'color 0.3s ease'
                                }} />
                            </button>
                            <FontAwesomeIcon icon={faComment} />
                        </div>
                    </div>
                    <style jsx>{`
                .icon {
                    transition: color 0.3s ease;
                }
                .liked {
                    color: #ff4500; 
                }
            `}</style>
                </div>
            ))}
        </div>
    )
}
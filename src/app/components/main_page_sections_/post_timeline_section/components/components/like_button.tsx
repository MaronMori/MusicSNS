import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toggleLike } from "@/app/components/main_page_sections_/post_timeline_section/components/functions/utils";
import { useState } from "react";

export const Like_button = ({ post }) => {
  const [likedPosts, setLikedPosts] = useState({});

  const handleLike = async (postId) => {
    // if the components doesn't have like yet(undefined), it will be false as default value.
    const liked = likedPosts[postId] || false;
    // this ...likedPosts is posts that is already liked
    // !liked switch like or unlike
    setLikedPosts({ ...likedPosts, [postId]: !liked });
    await toggleLike(postId, liked);
  };

  return (
    <button onClick={() => handleLike(post.id)}>
      <FontAwesomeIcon
        icon={faStar}
        style={{
          color: likedPosts[post.id] ? "#ff4500" : "#ccc",
          transition: "color 0.3s ease",
        }}
      />
      <style jsx>{`
        .icon {
          transition: color 0.3s ease;
        }
        .liked {
          color: #ff4500;
        }
      `}</style>
    </button>
  );
};

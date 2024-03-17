import { doc, updateDoc, increment } from "firebase/firestore";
import { firestore } from "../../../../../../../lib/FirebaseConfig";

// function to count likes
export const toggleLike = async (postId, liked) => {
  // reference to update count of like
  const postRef = doc(firestore, "posts", postId);

  // increase like or not
  const likeIncrement = liked ? increment(-1) : increment(1);

  // update firestore document
  await updateDoc(postRef, {
    likesCount: likeIncrement,
  });
};

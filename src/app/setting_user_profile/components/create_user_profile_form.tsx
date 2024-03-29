import { Form_userid } from "@/app/setting_user_profile/components/form_userid";
import { Form_display_name } from "@/app/setting_user_profile/components/form_display_name";
import { Form_user_bio } from "@/app/setting_user_profile/components/form_user_bio";
import { Form_user_pic } from "@/app/setting_user_profile/components/form_user_pic";
import { Submit_button_to_form } from "@/app/components/tools/submit_button_to_form";
import { firestore, storage } from "../../../../lib/FirebaseConfig";
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSetting_user_profile_context } from "@/app/components/provider/setting_user_profile_context";
import { useAuth } from "@/app/components/provider/auth_provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export const Create_user_profile_form = () => {
  const { userID, username, bio, image } = useSetting_user_profile_context();
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // function to check if there is already userid
  const checkUserIdExists = async (userID) => {
    const userRef = collection(firestore, "users");
    const q = query(userRef, where("userid", "==", userID));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const SetUpUserProfile = async (e) => {
    console.log("Submitted user Profile");
    e.preventDefault();
    setIsUploading(true);

    // check userID exist
    const userIdExists = await checkUserIdExists(userID);
    if (userIdExists) {
      console.error("This User Id already exists.");
      alert("This User Id already exists.");
      return; // If three is overlap, terminate creating user profile;
    }

    // to store userprofile on Firestore
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        userID,
        username,
        bio,
      });

      // if there is a profile picture, upload it to Firebase Storage
      if (image) {
        const storageRef = ref(storage, "profileImages/" + user.uid);
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);

        // upload picture of URL to Firestore profile
        await setDoc(
          doc(firestore, "users", user.uid),
          { profileImageUrl: imageUrl },
          { merge: true },
        );
        setIsUploading(false);
        alert("You created profile!");
        router.push("/");
      } else {
        const defaultProfileImageUrl =
          "https://firebasestorage.googleapis.com/v0/b/musicsns-671d3.appspot.com/o/defaultImages%2FDALL%C2%B7E%202023-12-19%2014.33.25%20-%20A%20gender-neutral%20default%20profile%20silhouette%20for%20social%20media%2C%20featuring%20a%20simple%20human%20silhouette%20without%20any%20distinguishing%20features%20like%20ears%20or%20hai.png?alt=media&token=e2cd86e9-b0f2-407d-804f-b9d229bbfda6";

        // upload default picture of URL to Firestore profile
        await setDoc(
          doc(firestore, "users", user.uid),
          { profileImageUrl: defaultProfileImageUrl },
          { merge: true },
        );
        setIsUploading(false);
        alert("You created profile!");
        router.push("/");
      }
    } catch (e) {
      console.log("Error adding document: ", e);
      alert(e.message);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center text-center items-center">
      <form
        onSubmit={SetUpUserProfile}
        className="w-full border border-black max-w-2xl p-4"
      >
        <h1 className="mb-6 text-2xl">Create Profile</h1>
        <Form_userid />
        <Form_display_name />
        <Form_user_bio />
        <Form_user_pic />
        <Submit_button_to_form text={"Done"} />
        <div className={"mt-4"}>{isUploading && <CircularProgress />}</div>
      </form>
    </div>
  );
};

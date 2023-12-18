import {Form_userid} from "@/app/setting_user_profile/components/form_userid";
import {Form_display_name} from "@/app/setting_user_profile/components/form_display_name";
import {Form_user_bio} from "@/app/setting_user_profile/components/form_user_bio";
import {Form_user_pic} from "@/app/setting_user_profile/components/form_user_pic";
import {Submit_button_to_form} from "@/app/components/submit_button_to_form";
import {auth, firebaseApp,firestore, storage} from "../../../../lib/FirebaseConfig";
import {getFirestore, setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {useSetting_user_profile_context} from "@/app/contexts/setting_user_profile_context";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";

export const Form = () => {
    const {userID, username, bio, image} = useSetting_user_profile_context()
    const [user, setUser] = useState(null);

    // this useEffect is used to get current user information. onAuthStateChange function listen user
    // authentication information
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // cleanup function
    }, []);
    console.log(auth)

    // function to check if there is already userid
    const checkUserIdExists = async (userID) => {
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("userid", "==", userID));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    const SetUpUserProfile = async (e) => {
        e.preventDefault();

        // check userID exist
        const userIdExists = await checkUserIdExists(userID);
        if (userIdExists){
            console.error("This User Id already exists.");
            alert("This User Id already exists.")
            return; // If three is overlap, terminate creating user profile;
        }

        // to store userprofile on Firestore
        try {
            await setDoc(doc(firestore,"users", user.uid), { userID, username, bio });
            console.log("Document written with ID: ");

            // if there is a profile picture, upload it to Firebase Storage
            if(image){
                const storageRef = ref(storage, "profileImages/" + user.uid);
                const snapshot = await uploadBytes(storageRef, image);
                const imageUrl = await getDownloadURL(snapshot.ref);

                // upload picture of URL to Firestore profile
                await setDoc(doc(firestore, "users", user.uid), { profileImageUrl: imageUrl }, { merge: true});
            }
        } catch (e) {
            console.log("Error adding document: ", e);
            alert(e.message);
        }
    }

    return(
        <div className="min-h-screen flex justify-center text-center items-center">
            <form onSubmit={SetUpUserProfile} className="w-full border border-black max-w-2xl p-4">
                <h1 className="mb-6 text-2xl">Create Profile</h1>
                <Form_userid />
                <Form_display_name />
                <Form_user_bio />
                <Form_user_pic />
                <Submit_button_to_form text={"Done"} />
            </form>
        </div>
    )
}
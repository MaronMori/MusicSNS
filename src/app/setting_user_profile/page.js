"use client"

import {useState} from "react";
import {getFirestore, setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import {auth, firebaseApp, firestore, storage} from "../../../lib/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"

export default function Setting_user_profile(){
    const [userid, setUserID] = useState("")
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);

    const user = auth.currentUser;

    // function to check if there is already userid
    const checkUserIdExists = async (userid) => {
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("userid", "==", userid));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    const SetUpUserProfile = async (e) => {
        e.preventDefault();

        // check userID exist
        const userIdExists = await checkUserIdExists(userid);
        if (userIdExists){
            console.error("This User Id already exists.");
            alert("This User Id already exists.")
            return; // If three is overlap, terminate creating user profile;
        }

        // to store userprofile on Firestore
        try {
            await setDoc(doc(firestore,"users", user.uid), { userid, username, bio });
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

    return (
        <main>
            <div>
                <form onSubmit={SetUpUserProfile}>
                    <h1>Create Profile</h1>
                    <div>
                        <label>User ID</label>
                        <input value={userid} onChange={(e) => setUserID(e.target.value)}/>
                    </div>
                    <div>
                        <label>Name</label>
                        <input  value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label>Profile</label>
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)}/>
                    </div>
                    <div>
                        <label>Profile Picture</label>
                        <input type={"file"} onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <button type={"submit"}>Done</button>
                </form>
            </div>
        </main>
    )
}
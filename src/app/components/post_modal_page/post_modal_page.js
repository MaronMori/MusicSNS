import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {firebaseApp, firestore, storage} from "../../../../lib/FirebaseConfig";
import {useAuth} from "@/app/components/provider/auth_provider";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {collection, addDoc, serverTimestamp, getDoc, doc} from "firebase/firestore";
import {useRouter} from "next/navigation";
import {data} from "autoprefixer";
import {Post_modal} from "@/app/components/post_modal_page/components/post_modal";
import {PostContentProvider} from "@/app/components/post_modal_page/contexts/fileInputRef_context";


export const Post_modal_page = ({show, onClose, onPost}) => {
    if (!show) {
        return null;
    }

    const { user: userAuth } = useAuth();
    if (!userAuth){
        return <div>Loading...</div>
    }

    // to get current user's info
    const [userData, setUserData] = useState({});

    // get current user's info including profile picture, display name, original user ID
    const fetchUserData = async (userId) => {
        const docSnap = await getDoc(doc(firestore, "users", userId));
        return docSnap.data();
    }

    useEffect(() => {
        setUserData(fetchUserData(userAuth.uid));
    }, [userAuth.uid]);

    return (
        <PostContentProvider>
            <div className={"modal-backdrop"} >
                <Post_modal userData={userData} userAuth={userAuth} onClose={onClose}/>
                <style jsx>
                    {`
            .modal-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0,0,0,0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
            }
            `}
                </style>
            </div>
        </PostContentProvider>
    )
}
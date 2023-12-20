import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {firebaseApp, firestore, storage} from "../../../lib/FirebaseConfig";
import {useAuth} from "@/app/provider/auth_provider";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {collection, addDoc, serverTimestamp, getDoc} from "firebase/firestore";
import {useRouter} from "next/navigation";
import {data} from "autoprefixer";

// function to upload image to storage
const uploadImageToStorage = async (imageFile, userid) => {
    const storageRef = ref(storage, `images/${userid}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl =  getDownloadURL(storageRef);
    console.log(imageUrl);
    return imageUrl;
}

// function to upload user's post
const submitPost = async ( userId, textContent, imageUrl, userPic, userName, originalUserId) => {
    try {
        const docRef = await addDoc(collection(firestore, "posts"),{
            userId: userId,
            text: textContent,
            image: imageUrl,
            create: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id)
        alert("Uploaded!!")
        return true;
    } catch (error) {
        console.error("Failed Posting: ", error);
        alert("Failed Posting")
        return false;
    }
}

// get current user's info including profile picture, display name, original user ID
const fetchUserData = async (userId) => {
    const docSnap = await getDoc(doc(firestore, "users", userId));
    return docSnap.data();
}

export const Post_modal = ({show, onClose, onPost}) => {
    if (!show) {
        return null;
    }
    const { user: userAuth } = useAuth();
    if (!userAuth){
        return <div>Loading...</div>
    }

    // to get current user's info
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData(fetchUserData(userAuth.uid));
    }, [userAuth.uid]);

    const [textContent, setTextContent ] = useState("");
    const [image, setImage ] = useState("")
    const [imagePreview, setImagePreview] = useState();

    const router = useRouter()

    const fileInputRef = useRef();


    // when Post button is clicked, function uses submitPost function and submits posting including userAuthId, textContent, imageUrl
    const handleSubmitPost = async (e) => {
        e.preventDefault();

        let imageUrl = "";
        const userId = userAuth.uid;

        if (fileInputRef.current.files[0]){
        imageUrl = await uploadImageToStorage(fileInputRef.current.files[0], userId)}

        if (await submitPost(userId, textContent, imageUrl, userData.profileImageUrl, userData.username, userData.userid)){
            // reset form
            setTextContent("");
            setImage("");
            setImagePreview(null);

            // close modal and reload page
            onClose()
            router.push("/")
        }
    };

    // if photo icon is clicked, the action is considered as that Input tag that is type of file is clicked.
    const handleIconClick = () => {
        fileInputRef.current.click();
    }

    // to show image preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file)
        }
    }

    return (
    <div className={"modal-backdrop"} >
        <form className={"modal p-3"} onSubmit={handleSubmitPost} style={{maxHeight: "80%"}}>
            <div className={"modal-header"}>
                <div className={"modal-cancel-icon"}>
                    <button className={"mb-2"} onClick={onClose}>×</button>
                </div>
                <hr className={"font-bold"}/>
            </div>
            <div className={"modal-body flex "} style={{maxHeight: "100%"}}>
                <div className={"modal-user-pic mr-2"}>user icon</div>
                <div className={"modal-user-input "} style={{maxHeight: "100%"}}>
                    {imagePreview && <img src={imagePreview} alt={"Image Preview"} className={"h-96 w-auto"} />}
                    <textarea className={"w-full h-auto p-2"} value={textContent} onChange={(e) => setTextContent(e.target.value)}/>
                </div>
            </div>
            <hr className={"font-bold"}/>
            <div className={"modal-footer flex justify-between"}>
                <div>
                    <input type={"file"} accept="image/png, image/gif, image/jpeg" style={{ display: "none"}} ref={fileInputRef} onChange={handleFileChange}/>
                    <button type={"button"} onClick={handleIconClick} className={"icon-button pt-3 pl-1"}>
                        <FontAwesomeIcon icon={faImage} size="xl"/>
                    </button>
                </div>
                <button className={"mt-2 border border-black rounded-2xl py-1 px-2"} type={"submit"}>Post</button>
            </div>
        </form>
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
            .modal {
              background: white;
              border-radius: 8px;
              max-width: 80%;
              max-height: 80%;
              width: auto;
              height: auto;
              overflow: auto;
            }
            .icon-button:hover{
              color: #48f;
            }
            `}
        </style>
    </div>
    )
}
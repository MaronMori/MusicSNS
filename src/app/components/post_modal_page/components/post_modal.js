import {Post_modal_header} from "@/app/components/post_modal_page/components/post_modal_header";
import {Post_modal_body} from "@/app/components/post_modal_page/components/post_modal_body";
import {Post_modal_footer} from "@/app/components/post_modal_page/components/post_modal_footer";
import {useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {firestore, storage} from "../../../../../lib/FirebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {usePostContentContext} from "@/app/components/post_modal_page/contexts/fileInputRef_context";

export const Post_modal = ({userData, userAuth, onClose, setPostMusic}) => {
    const {textContent, setTextContent,setImage, setImagePreview } = usePostContentContext()
    const [ uploading, setUploading ] = useState(false)

    const router = useRouter()

    const fileInputRef = useRef();

    // function to upload user's components
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

    // function to upload image to storage
    const uploadImageToStorage = async (imageFile, userid) => {
        const storageRef = ref(storage, `images/${userid}/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl =  getDownloadURL(storageRef);
        console.log(imageUrl);
        return imageUrl;
    }

    // when Post button is clicked, function uses submitPost function and submits posting including userAuthId, textContent, imageUrl
    const handleSubmitPost = async (e) => {
        e.preventDefault();
        setUploading(true)

        let imageUrl = "";
        const userId = userAuth.uid;

        // upload picture and get image url
        if (fileInputRef.current.files[0]){
            imageUrl = await uploadImageToStorage(fileInputRef.current.files[0], userId)}

        if (await submitPost(userId, textContent, imageUrl, userData.profileImageUrl, userData.username, userData.userid)){
            // reset form
            setTextContent("");
            setImage("");
            setImagePreview(null);
            setUploading(false)

            // close modal and reload page
            onClose()
            router.push("/")
        }
    };



    return (
        <form className={"modal p-3"} onSubmit={handleSubmitPost} style={{maxHeight: "80%"}}>
            <Post_modal_header onClose={onClose}/>
            <Post_modal_body />
            <hr className={"font-bold"}/>
            <Post_modal_footer fileInputRef={fileInputRef} uploading={uploading}　setPostMusic={setPostMusic}/>
            <style jsx>
                {`
            .modal {
              background: white;
              border-radius: 8px;
              max-width: 80%;
              max-height: 80%;
              width: 45%;
              height: auto;
              overflow: auto;
            }
            @media (max-width: 600px) {
              .modal {
                max-width: 90%;
                max-height: 60%;
                width: 80%;
              }}
            `}
            </style>
        </form>
    )
}
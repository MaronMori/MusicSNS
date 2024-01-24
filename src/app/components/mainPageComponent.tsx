import {Menu_section} from "@/app/components/main_page_sections_/menu_section/menu_section";
import {Post_timeline_section} from "@/app/components/main_page_sections_/post_timeline_section/post_timeline_section";
import {Post_modal_page} from "@/app/components/post_modal_page/post_modal_page";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import {LoadingPage} from "@/app/components/tools/loading";
import {useAuth} from "@/app/components/provider/auth_provider";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import {firestore} from "../../../lib/FirebaseConfig";
import {update} from "@firebase/database";

export const MainPageComponent = ({code}) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading ] = useState(false);
    const {user: userAuth} = useAuth();

    const openModal = ():void => setShowModal(true);
    const closeModal = ():void => setShowModal(false);

    useEffect(() => {
        if (!userAuth || !code) {
            return;
        }

        if (code) {
            console.log("start API")
            setLoading(true)
            fetch("/api/spotifyAPI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json(); // レスポンスがOKならJSONとして解析
                    } else {
                        throw new Error('Network response was not ok'); // レスポンスがOKでない場合はエラーを投げる
                    }
                })
                .then(async (data) => {
                    if (!userAuth) {
                        console.error("User is not authenticated");
                        return;
                    }
                    // store songs to firebase (users document)
                    sessionStorage.setItem("spotifyAccessToken", data.accessToken)
                    sessionStorage.setItem("spotifyRefreshToken", data.refreshToken)
                        try {
                            await updateDoc(doc(firestore,"users", userAuth.uid), { Songs: data.userSongs, NextURL: data.nextURL });
                        }catch (e) {
                            console.log("Error uploading songs to firebase: ", e);
                            alert(e.message);
                        }
                        setLoading(false)
                })
        }
    }, [userAuth, code]);

    if(loading || !userAuth){
        return <LoadingPage text={"Uploading your songs to database..."}/>
    }
    return (
        <main>
            <div className="h-svh flex flex-col-reverse md:grid grid-cols-3">
                <div className={"fixed bottom-0 md:static w-full"}
                     style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
                    <Menu_section openModal={openModal}/>
                </div>
                <Post_timeline_section/>
                <section className="container"></section>
                <Post_modal_page show={showModal} onClose={closeModal} />
            </div>
        </main>
    )
}
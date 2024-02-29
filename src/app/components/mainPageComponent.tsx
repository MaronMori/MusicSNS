import {Menu_section} from "@/app/components/main_page_sections_/menu_section/menu_section";
import {Post_timeline_section} from "@/app/components/main_page_sections_/post_timeline_section/post_timeline_section";
import {Post_modal_page} from "@/app/components/post_modal_page/post_modal_page";
import {useEffect, useState} from "react";
import {LoadingPage} from "@/app/components/tools/loading";
import {useAuth} from "@/app/components/provider/auth_provider";
import {doc, updateDoc} from "firebase/firestore";
import {firestore} from "../../../lib/FirebaseConfig";
import {SpotifyTokenProvider} from "@/app/components/provider/spotify_token_provider";
import {useRouter} from "next/navigation";

export const MainPageComponent = ({code}) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading ] = useState(false);
    const {user: userAuth} = useAuth();
    const router = useRouter()

    const openModal = ():void => setShowModal(true);
    const closeModal = ():void => setShowModal(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!userAuth || !code) {
                return;
            }

            console.log("start API");
            setLoading(true);
            try {
                const response = await fetch("/api/spotifyAPI", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code }),
                });

                if (!response.ok) {
                    await router.push("/");
                    return; // router.push後はこれ以上の処理を行わない
                }

                const data = await response.json();
                if (!userAuth) {
                    console.error("User is not authenticated");
                    return;
                }
                // トークンと現在の時刻＋有効期限を保存
                const currentTime = new Date().getTime();
                const expiresIn = data.expiresIn;
                const expireTime = currentTime + expiresIn * 1000;
                sessionStorage.setItem("spotifyAccessToken", data.accessToken);
                sessionStorage.setItem("spotifyRefreshToken", data.refreshToken);
                sessionStorage.setItem("tokenExpireTime", expireTime.toString());

                await updateDoc(doc(firestore, "users", userAuth.uid), { Songs: data.userSongs, NextURL: data.nextURL });
            } catch (e) {
                console.log("Error during the API call or document update:", e);
                alert(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userAuth, code]);

    if(loading || !userAuth){
        return <LoadingPage text={"Uploading your songs to server..."}/>
    }
    return (
        <SpotifyTokenProvider>
            <main>
                <div className="h-svh flex flex-col-reverse md:grid grid-cols-3">
                    <div className={"fixed z-50 bottom-0 md:static w-full shadow-2xl"}
                         style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
                        <Menu_section ifTimeline={true} openModal={openModal}/>
                    </div>
                    <Post_timeline_section/>
                    <section className="container"></section>
                    <Post_modal_page show={showModal} onClose={closeModal}/>
                </div>
            </main>
        </SpotifyTokenProvider>
    )
}
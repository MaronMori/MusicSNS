import {useEffect, useState} from "react";
import SpotifyLogin from "@/app/settings/components/spotifyLogin";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../../../../../lib/FirebaseConfig";
import {useAuth} from "@/app/components/provider/auth_provider";
import {List_item_song} from "@/app/components/post_modal_page/components/post_spotify_components/list_item_song";

export const Post_music_body = () => {
    const [ songs, setSongs] = useState([])
    const [ nextPage, setNextPage] = useState()
    const {user} = useAuth()

    useEffect(() => {
        const getUserSongs = async (user) => {
            const userDataDoc = await getDoc(doc(firestore, "users", user.uid));
            const userData = userDataDoc.data()

            const userSongs = userData.Songs;
            const nextURL = userData.NextURL;

            setSongs(userSongs)
            setNextPage(nextURL)
        }

        if(user){
            getUserSongs(user)

        }
    }, [user]);

    if(!songs){
        return (
            <div className={"flex justify-center py-10"}>
                <SpotifyLogin />
            </div>
        )
    }

    return (
        <div>
            {songs.map((item) => (
                <List_item_song song={item} />
            ))}
        </div>
    )
}
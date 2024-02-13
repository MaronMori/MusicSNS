import {useEffect, useState} from "react";
import SpotifyLogin from "@/app/settings/components/spotifyLogin";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../../../../../lib/FirebaseConfig";
import {useAuth} from "@/app/components/provider/auth_provider";
import {List_item_song} from "@/app/components/post_modal_page/components/post_spotify_components/list_item_song";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import {CircularProgress} from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";

export const Post_music_body = ({
                                    songPostPage,
                                    setSongPostPage,
                                    isPlaying,
                                    setIsPlaying,
                                    setTextContent,
                                    textContent,
                                    trackInfoForPost,
                                    setTrackInfoForPost,
                                    previewUrl,
                                    audioRef,
                                    togglePlay
                                }) => {
    const [songs, setSongs] = useState([])
    const [nextPage, setNextPage] = useState()

    const [isLoading, setIsLoading] = useState(true);


    const {user} = useAuth()



    useEffect(() => {
        const getUserSongs = async (user) => {
            setIsLoading(true)
            const userDataDoc = await getDoc(doc(firestore, "users", user.uid));
            const userData = userDataDoc.data()

            const userSongs = userData.Songs;
            const nextURL = userData.NextURL;

            setSongs(userSongs)
            setNextPage(nextURL)
            setIsLoading(false)
        }

        if (user) {
            getUserSongs(user)

        }
    }, [user]);



    if (!songs && !songPostPage) {
        return (
            <div className={"flex justify-center py-10"}>
                <SpotifyLogin/>
            </div>
        )
    }

    if (songPostPage) {
        return (
            <div>
                <div className={"relative my-4 p-5 border border-amber-300 text-center shadow bg-amber-300"}>
                    <div className={"flex justify-center mb-8 bg-amber-500 py-2 rounded-2xl font-bold"}>
                        <div className={"flex space-x-4"}>
                            <AutoAwesomeIcon/>
                            <p>My Favorite Song</p>
                            <AutoAwesomeIcon/>
                        </div>
                    </div>
                    <img className={""} src={trackInfoForPost.track.album.images[0].url} alt={"Song Picture"}/>
                    {trackInfoForPost.track.preview_url ?
                        <button
                            type={"button"}
                            onClick={(event) => togglePlay(undefined, event)}
                            className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
                            {isPlaying ? <PauseCircleOutlineIcon color={"success"} style={{fontSize: "90px"}}/> :
                                <PlayCircleOutlineIcon color={"success"} style={{fontSize: "90px"}}/>}
                        </button>
                        :
                        <CloseIcon style={{fontSize: "90px"}} className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"} />
                    }

                </div>
                <div>
                    <textarea className={"w-full h-auto p-2"} rows={3} placeholder={"I love this song!"}
                              value={textContent}
                              onChange={(e) => setTextContent(e.target.value)}/>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className={"text-center py-12"}>
                <CircularProgress/>
            </div>
        )
    }

    return (
                <div>
                    {songs.map((item, index) => (
                        <List_item_song key={index}
                                        previewUrl={previewUrl}
                                        setIsPlaying={setIsPlaying}
                                        audioRef={audioRef} isPlaying={isPlaying} song={item}
                                        setSongPost={setSongPostPage}
                                        setTrackInfoForPost={setTrackInfoForPost}
                                        togglePlay={togglePlay}
                        />
                    ))}
                </div>
    )
}
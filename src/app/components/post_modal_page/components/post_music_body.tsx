import {useEffect, useRef, useState} from "react";
import SpotifyLogin from "@/app/settings/components/spotifyLogin";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../../../../../lib/FirebaseConfig";
import {useAuth} from "@/app/components/provider/auth_provider";
import {List_item_song} from "@/app/components/post_modal_page/components/post_spotify_components/list_item_song";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import {flag} from "arg";
import {element} from "prop-types";
import {CircularProgress} from "@mui/material";

export const Post_music_body = ({isPlaying, setIsPlaying}) => {
    const [ songs, setSongs] = useState([])
    const [ nextPage, setNextPage] = useState()
    const [ songPost, setSongPost] = useState(false)
    const [ trackInfoForPost, setTrackInfoForPost] = useState({
        track: undefined
    })
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null >(null)


    const {user} = useAuth()

    useEffect(() => {
        if (trackInfoForPost.track && trackInfoForPost.track.preview_url) {
            audioRef.current = new Audio(trackInfoForPost.track.preview_url);
        }
    }, [trackInfoForPost.track]);

    useEffect(() => {
        if(audioRef.current){
            if (!isPlaying){
                audioRef.current.pause()
            }else {
                audioRef.current.play();
            }
            return () => {
                if (audioRef.current && isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(!isPlaying)
                }else {
                    setIsPlaying(false)
                }
            }
        }
    }, [isPlaying]);
    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

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

    if (songPost && trackInfoForPost !== undefined) {
        return (
            <div className={"relative"}>
                <img className={""} src={trackInfoForPost.track.album.images[0].url} alt={"Song Picture"}/>
                <button onClick={togglePlay} className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
                    {isPlaying ? <PauseCircleOutlineIcon style={{fontSize: "90px"}}/> : <PlayCircleOutlineIcon style={{fontSize: "90px"}}/>}
                </button>
            </div>
        )
    }

    if(isLoading){
        return (
            <div className={"text-center py-12"}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            {songs.map((item) => (
                <List_item_song song={item} setSongPost={setSongPost} setTrackInfoForPost={setTrackInfoForPost}/>
            ))}
        </div>
    )
}
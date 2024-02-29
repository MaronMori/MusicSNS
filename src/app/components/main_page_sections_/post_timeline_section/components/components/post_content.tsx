import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import {useManageSongPlayer} from "@/app/components/provider/manage_song_player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpotify} from "@fortawesome/free-brands-svg-icons/faSpotify";
import {Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const Post_content = ({post}) => {

    const {audioRef, previewUrl, setPreviewUrl, isPlayingTimelineContent, setIsPlayingTimelineContent} = useManageSongPlayer()

    const togglePlay = async (e) => {
        e.preventDefault();
        const previewSongUrl = post.songData.track.preview_url

        if(previewUrl !== previewSongUrl && !isPlayingTimelineContent){
            await setPreviewUrl(previewSongUrl)
            setIsPlayingTimelineContent(true)
            audioRef.current.play()
        }else if(previewUrl === previewSongUrl && !isPlayingTimelineContent){
            setIsPlayingTimelineContent(true)
            audioRef.current.play()
        }else if(previewUrl === previewSongUrl && isPlayingTimelineContent){
            setIsPlayingTimelineContent(false)
            audioRef.current.pause()
        }else if(previewUrl !== previewSongUrl && isPlayingTimelineContent){
            await setIsPlayingTimelineContent(false)
            audioRef.current.pause()
            await setPreviewUrl(previewSongUrl)
            setIsPlayingTimelineContent(true)
            audioRef.current.play()
        }
    }

    // if post includes songData, display song post.
    if (post.songData){
        return (
            <div className={"relative z-0"}>
                <div className={"relative my-4 p-5 border border-amber-300 text-center shadow bg-amber-300"}>
                    <div className={"flex justify-center mb-4 bg-amber-500 py-2 rounded-2xl font-bold shadow-2xl"}>
                        <div className={"flex space-x-4"}>
                            <AutoAwesomeIcon/>
                            <p>My Favorite Song</p>
                            <AutoAwesomeIcon/>
                        </div>
                    </div>
                    <div>
                        <div className={"text-2xl font-bold"}>
                            {post.songData.track.name}
                        </div>
                        <div className={"flex justify-center"}>
                            {post.songData.track.artists.map((artist) => <div>{artist.name}</div>)}
                        </div>
                    </div>
                    <img className={"shadow-xl"} src={post.songData.track.album.images[0].url} alt={"Song Picture"}/>
                    {post.songData.track.preview_url ?
                        <button
                            type={"button"}
                            onClick={(e) => togglePlay(e)}
                            className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
                            {isPlayingTimelineContent && previewUrl === post.songData.track.preview_url ?
                                <PauseCircleIcon color={"success"} className={"shadow-2xl"} style={{fontSize: "90px"}}/>
                                :
                                <PlayCircleIcon color={"success"} className={"shadow-2xl"} style={{fontSize: "90px"}}/>}
                        </button>
                        :
                        <CloseIcon style={{ fontSize: "90px"}} className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}/>
                    }
                    <div className={"mt-4"}>
                        <Button component={"a"} href={post.songData.track.album.external_urls.spotify} className={"w-full"} variant={"contained"} sx={{
                            backgroundColor: "#00EE00", // 通常時の背景色
                            '&:hover': {
                                backgroundColor: "#00CC00", // ホバー時の背景色
                            },
                            '&:active': {
                                backgroundColor: "#00AA00", // 押下時の背景色
                            },
                        }}>Go to This Song
                            <FontAwesomeIcon icon={faSpotify} className={"ml-2"}/>
                        </Button>
                    </div>
                </div>
                <div className={"post_content py-2 px-3"}>
                    <p>{post.text}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={"post_content py-2 px-3"}>
        <p>{post.text}</p>
        </div>
    )
}
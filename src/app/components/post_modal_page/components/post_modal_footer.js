import {Photo_icon_button} from "@/app/components/post_modal_page/components/photo_icon_button";
import {Post_button} from "@/app/components/post_modal_page/components/post_button";
import {Post_spotify_song} from "./post_spotify_song"

export const Post_modal_footer = ({fileInputRef, uploading, setPostMusic}) => {
    return (
        <div className={"modal-footer flex justify-between"}>
            <Photo_icon_button fileInputRef={fileInputRef}/>
            <Post_spotify_song setPostMusic={setPostMusic}/>
            <Post_button uploading={uploading}/>
        </div>
    )
}
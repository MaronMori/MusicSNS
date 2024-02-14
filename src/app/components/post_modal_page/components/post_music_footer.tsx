import {Post_song_button} from "@/app/components/post_modal_page/components/post_song_button";

export const Post_music_footer = ({uploadingSong}) => {
    return(
        <div className={"text-right"}>
            <Post_song_button uploadingSong={uploadingSong}/>
        </div>
    )
}
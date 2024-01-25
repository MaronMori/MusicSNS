import {Post_modal_header} from "@/app/components/post_modal_page/components/post_modal_header";
import {Post_music_body} from "@/app/components/post_modal_page/components/post_music_body";
import {Post_music_header} from "@/app/components/post_modal_page/components/post_music_header";

export const Post_music_modal = ({onBack, isPlaying, setIsPlaying}) => {

    return (
        <form className={"modal p-3"}>
            <Post_music_header onBack={onBack}/>
            <Post_music_body isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
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
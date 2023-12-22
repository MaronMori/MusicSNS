import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {Photo_icon_button} from "@/app/post_modal_page/components/photo_icon_button";
import {Post_button} from "@/app/post_modal_page/components/post_button";

export const Post_modal_footer = ({fileInputRef}) => {
    return (
        <div className={"modal-footer flex justify-between"}>
            <Photo_icon_button fileInputRef={fileInputRef}/>
            <Post_button />
        </div>
    )
}
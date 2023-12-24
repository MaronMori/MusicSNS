import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react";
import {usePostContentContext} from "@/app/components/post_modal_page/contexts/fileInputRef_context";

export const Photo_icon_button = ({fileInputRef}) => {
    const { setImagePreview } = usePostContentContext()

    // to show image preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file)
        }
    }
    // if photo icon is clicked, the action is considered as that Input tag that is type of file is clicked.
    const handleIconClick = () => {
        fileInputRef.current.click();
    }

    return (
        <div>
            <input type={"file"} accept="image/png, image/gif, image/jpeg" style={{ display: "none"}} ref={fileInputRef} onChange={handleFileChange}/>
            <button type={"button"} onClick={handleIconClick} className={"icon-button pt-3 pl-1"}>
                <FontAwesomeIcon icon={faImage} size="xl"/>
            </button>
        </div>
    )
}
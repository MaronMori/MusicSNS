import {usePostContentContext} from "@/app/components/post_modal_page/contexts/fileInputRef_context";

export const Post_modal_body = () => {
    const { imagePreview, textContent, setTextContent } = usePostContentContext();

    return (
        <div className={"modal-body flex "} style={{maxHeight: "100%"}}>
            <div className={"modal-user-pic mr-2"}>user icon</div>
            <div className={"modal-user-input "} style={{maxHeight: "100%"}}>
                {imagePreview && <img src={imagePreview} alt={"Image Preview"} className={"h-96 w-auto"} />}
                <textarea className={"w-full h-auto p-2"} value={textContent} onChange={(e) => setTextContent(e.target.value)}/>
            </div>
        </div>
    )
}
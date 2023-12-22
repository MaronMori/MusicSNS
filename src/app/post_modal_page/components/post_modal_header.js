export const Post_modal_header = ({onClose}) => {
    return (
        <div className={"modal-header"}>
            <div className={"modal-cancel-icon"}>
                <button className={"mb-2"} onClick={onClose}>×</button>
            </div>
            <hr className={"font-bold"}/>
        </div>
    )
}
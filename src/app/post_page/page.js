export const Post_modal = ({show, onClose, onPost}) => {
    if (!show) {
        return null;
    }
    return (
    <div className={"modal-backdrop"}>
        <div className={"modal p-3"}>
            <div className={"modal-header"}>
                <div className={"modal-cancel-icon"}>
                    <button className={"mb-2"} onClick={onClose}>×</button>
                </div>
                <hr className={"font-bold"}/>
            </div>
            <div className={"modal-body flex"}>
                <div className={"modal-user-pic mr-2"}>picture</div>
                <div className={"modal-user-input flex-grow h-36"}>
                    <textarea className={"w-full h-full p-2"}/>
                </div>
            </div>
            <div className={"modal-footer"}>
                <hr className={"font-bold"}/>
                <button className={"mt-2 border border-black rounded-2xl py-1 px-2"} onClick={onPost}>Post</button>
            </div>
        </div>
        <style jsx>
            {`
            .modal-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0,0,0,0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
            }
            .modal {
              background: white;
              border-radius: 8px;
              max-width: 500px;
              width: 100%;
            }
            `}
        </style>
    </div>
    )
}
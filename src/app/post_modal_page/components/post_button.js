export const Post_button = () => {
    return (
        <div>
            <button className={"mt-2 border border-black rounded-2xl py-1 px-2"} type={"submit"}>Post</button>
            <style jsx>
                {`
            .icon-button:hover{
              color: #48f;
            }
            `}
            </style>
        </div>
    )
}
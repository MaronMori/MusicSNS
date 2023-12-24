export const Post_content = ({post}) => {
    return (
        <div className={"post_content py-2 px-3"}>
            <p>{post.text}</p>
        </div>
    )
}
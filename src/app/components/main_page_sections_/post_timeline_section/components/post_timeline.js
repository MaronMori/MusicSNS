import {Post} from "@/app/components/main_page_sections_/post_timeline_section/components/components/post";

export const Post_timeline = ({ posts }) => {



    return(
        <div className={"mb-8 md:my-6"}>
            <div className="post_tilmeline flex flex-col md:h-[calc(100vh-3rem)] md:overflow-y-auto shadow-2xl bg-white rounded">
                {posts.map((post) => (
                    <Post key={post.id} post={post}/>
                ))}
            </div>
        </div>
    )
}
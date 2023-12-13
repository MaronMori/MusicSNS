import {Post_header} from "@/app/components/post/post_header";
import {Post_actions} from "@/app/components/post/post_actions";
import {Post_picture} from "@/app/components/post/Post_picture";
import {Post_description} from "@/app/components/post/post_description";
import {More_read_button} from "@/app/components/post/more_read_button";

export const Post = () => {
    return(
        <div className="flex flex-col">
            <Post_header />
            <Post_picture />
            <Post_actions />
            <Post_description />
            <More_read_button />
        </div>
    )
}
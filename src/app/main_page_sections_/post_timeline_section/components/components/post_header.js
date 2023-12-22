import {useAuth} from "@/app/provider/auth_provider";

export const Post_header = ({post}) => {


    return (
        <div className={"post_header flex p-2"}>
            <div className={"w-12 h-12 flex-none"}>
                <img src={post.userProfileImage} className={"rounded-full"} alt={"UserProfileImage"}/>
            </div>
            <div className={"flex flex-auto justify-between items-center px-2"}>
                <div className={"font-bold"}>
                    <p>{post.username}</p>
                </div>
                <div>
                    <p>{post.create}</p>
                </div>
            </div>
        </div>
    )
}
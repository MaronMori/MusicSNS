import Image from "next/image";

export const Post_header = ({ post }) => {
  return (
    <div className={"post_header flex p-2"}>
      <div className={"w-12 h-12 flex-none"}>
        <Image
          width={24}
          height={24}
          src={post.userProfileImage}
          className={"rounded-full w-12 h-12"}
          alt={"UserProfileImage"}
        />
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
  );
};

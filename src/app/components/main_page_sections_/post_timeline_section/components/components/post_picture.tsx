import Image from "next/image";

export const Post_picture = ({ post }) => {
  return (
    <div className={"flex justify-center"}>
      <Image width={400} height={450} src={post.image} alt={"PostImage"} />
    </div>
  );
};

import { Post_header } from "@/app/components/main_page_sections_/post_timeline_section/components/components/post_header";
import { Post_content } from "@/app/components/main_page_sections_/post_timeline_section/components/components/post_content";
import { Post_picture } from "@/app/components/main_page_sections_/post_timeline_section/components/components/post_picture";
import { Post_footer } from "@/app/components/main_page_sections_/post_timeline_section/components/components/post_footer";

export const Post = ({ post }) => {
  return (
    <div key={post.id} className={"border border-[#f1f5f9] bg-white"}>
      <Post_header post={post} />
      <Post_content post={post} />
      {post.image && <Post_picture post={post} />}
      <Post_footer post={post} />
    </div>
  );
};

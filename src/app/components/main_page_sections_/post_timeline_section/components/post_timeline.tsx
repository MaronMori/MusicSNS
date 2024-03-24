import { Post } from "@/app/components/main_page_sections_/post_timeline_section/components/components/post";

export const Post_timeline = ({ posts }) => {
  return (
    <div className="post_tilmeline h-auto md:flex-col  shadow-2xl bg-white rounded">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

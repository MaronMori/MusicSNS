import { Like_button } from "@/app/components/main_page_sections_/post_timeline_section/components/components/like_button";

export const Post_footer = ({ post }) => {
  return (
    <div className={"post_footer"}>
      <div className={"px-2 pb-1 icons grid-cols-2 space-x-2"}>
        <Like_button post={post} />
        {/*<FontAwesomeIcon icon={faComment} />*/}
      </div>
    </div>
  );
};

import { usePostContentContext } from "@/app/components/post_modal_page/contexts/fileInputRef_context";
import { useUserProfileInfo } from "@/app/components/provider/user_profile_info_provider";
import Image from "next/image";

export const Post_modal_body = () => {
  const { imagePreview, textContent, setTextContent } = usePostContentContext();
  const { userProfileInfo } = useUserProfileInfo();

  const userPic = userProfileInfo.profileImageUrl;

  return (
    <div className={"modal-body flex "} style={{ maxHeight: "100%" }}>
      <div className={"modal-user-pic w-16 mr-3 mt-2"}>
        <Image
          width={450}
          height={450}
          src={userPic}
          className={"h-12 w-12 rounded-full"}
          alt={"userImage"}
        />
      </div>
      <div className={"modal-user-input w-full"} style={{ maxHeight: "100%" }}>
        {imagePreview && (
          <Image
            width={400}
            height={450}
            src={imagePreview}
            alt={"Image Preview"}
            className={"h-96 w-auto"}
          />
        )}
        <textarea
          className={"w-full h-auto p-2"}
          rows={5}
          placeholder={"Hello!!"}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />
      </div>
      <style jsx>
        {`
          textarea:focus {
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

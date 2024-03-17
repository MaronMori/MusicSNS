import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const IconOrImage = ({ userPic, icon }) => {
  if (userPic) {
    return (
      <Image
        width={24}
        height={24}
        src={userPic}
        className="w-6 h-6 rounded-full"
        alt="User Profile"
      />
    );
  }

  return <FontAwesomeIcon icon={icon} className="text-2xl" />;
};

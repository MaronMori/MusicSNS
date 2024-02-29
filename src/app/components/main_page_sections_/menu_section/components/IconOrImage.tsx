import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const IconOrImage = ({userPic, icon}) => {
    if (userPic) {
        return (
            <img src={userPic} className="w-6 h-6 rounded-full" alt="User Profile"/>
        )
    }

    return (
        <FontAwesomeIcon icon={icon} className="text-2xl" />
    )
}
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Menu = ({key, title, page, icon, userPic, openModal, isActive}) => {

    // to hide unactivated menu
    const liClass = isActive ? "active" : "inactive";

    return (
        <li key={key} className={`items-center my-3 ml-3 mr-auto ${liClass}`} style={{ maxWidth: "70%" }}>
            {openModal ? (<button onClick={openModal} className="flex items-center text-3xl w-full">
                <div className="flex justify-center items-center w-10 h-10 ml-6 mr-2">
                    <FontAwesomeIcon icon={icon} className="text-2xl" />
                </div>
                    <div className="ml-2">
                        {title}
                    </div>
            </button>)
                : (<Link href={page} className="flex items-center text-3xl">
                        <div className="flex justify-center items-center w-10 h-10 ml-6 mr-2">
                            {userPic ? (
                                <img src={userPic} className="w-6 h-6 rounded-full" alt="User Profile" />
                            ) : (
                                <FontAwesomeIcon icon={icon} className="text-2xl" />
                            )}
                        </div>
                        <div className="ml-2">
                            {title}
                        </div>
                </Link>)
            }
            <hr/>
            <style jsx>
                {`
                  li {
                    position: relative;
                    padding-bottom: 5px;
                  }
                  hr {
                   position: absolute;
                    bottom: 0;
                    left: 10%;
                    width: 0;
                    height: 2px; 
                    background-color: black; 
                    border: none; 
                    transition: width 0.3s ease;
                  }
                li:hover hr{
                  width: 70%;
                }
                li.inactive {
                  background: gray;
                }
                li.active:hover{
                  background: #F3F8FF;
                }
                `}
            </style>
        </li>
    );
}
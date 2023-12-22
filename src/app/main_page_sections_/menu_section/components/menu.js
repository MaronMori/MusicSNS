import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Menu = ({key, title, page, icon, userPic, openModal}) => {
    return (
        <li key={key} className="items-center m-3" style={{ maxWidth: "80%" }}>
            {openModal ? (<button onClick={openModal} className="flex items-center text-3xl">
                <div className="flex justify-center items-center w-10 h-10 ml-6 mr-2">
                    <FontAwesomeIcon icon={icon} className="text-2xl" />
                </div>
                    <div className="ml-2">
                        {title}
                    </div>
            </button>)
                : (<a href={page} className="flex items-center text-3xl">
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
            </a>)
            }
            <hr/>
            <style jsx>
                {`
                  li {
                    position: relative;
                  }
                  hr {
                   position: absolute;
                    bottom: -5px;
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
                `}
            </style>
        </li>
    );
}
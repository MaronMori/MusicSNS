import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconOrImage } from "./IconOrImage";
import React, { Dispatch, SetStateAction } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type MenuProps = {
  title: string;
  pageName: string;
  setPage: Dispatch<SetStateAction<string>>;
  icon: IconDefinition | IconProp | boolean;
  userPic: boolean | string;
  openModal: (() => void) | boolean;
  isActive: boolean;
  mobile: boolean;
};
export const Menu: React.FC<MenuProps> = ({
  title,
  icon,
  userPic,
  openModal,
  isActive,
  pageName,
  setPage,
  mobile,
}) => {
  // to hide unactivated menu
  const liClass: string = isActive ? "active" : "hidden";
  let iconType = null;

  if (typeof icon !== "string" && typeof icon !== "boolean") {
    iconType = icon;
  }

  // mobile menu
  if (mobile) {
    return (
      <li className={`items-center ${liClass}`} style={{ maxWidth: "70%" }}>
        {typeof openModal === "function" ? (
          <button
            type={"button"}
            onClick={openModal}
            className="flex items-center text-3xl w-full"
          >
            <div className="flex justify-center  w-10 h-10">
              <FontAwesomeIcon icon={iconType} className="text-2xl" />
            </div>
          </button>
        ) : (
          <button
            type={"button"}
            onClick={() => setPage(pageName)}
            className="flex items-center text-3xl"
          >
            <div className="flex justify-center w-10 h-10 ">
              <IconOrImage icon={icon} userPic={userPic} />
            </div>
          </button>
        )}
      </li>
    );
  }

  // desktop menu
  return (
    <li
      className={`items-center my-3 ml-3 mr-auto ${liClass}`}
      style={{ maxWidth: "70%" }}
    >
      {typeof openModal === "function" ? (
        <button
          type={"button"}
          onClick={openModal}
          className="flex items-center text-3xl w-full"
        >
          <div className="flex justify-center items-center w-10 h-10 ml-6 mr-2">
            <FontAwesomeIcon icon={iconType} className="text-2xl" />
          </div>
          <div className="ml-2">{title}</div>
        </button>
      ) : (
        <button
          type={"button"}
          onClick={() => setPage(pageName)}
          className="flex items-center text-3xl"
        >
          <div className="flex justify-center items-center w-10 h-10 ml-6 mr-2">
            <IconOrImage icon={icon} userPic={userPic} />
          </div>
          <div className="ml-2">{title}</div>
        </button>
      )}
      <hr />
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
          li:hover hr {
            width: 70%;
          }
        `}
      </style>
    </li>
  );
};

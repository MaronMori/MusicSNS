import { Logo } from "@/app/components/logo/logo";
import { Menu } from "@/app/components/main_page_sections_/menu_section/components/menu";
import {
  faBell,
  faGear,
  faHouse,
  faMagnifyingGlass,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useUserProfileImage } from "@/app/components/provider/user_profile_image";
import { CircularProgress } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";

type MenuSectionProps = {
  ifTimeline: boolean;
  openModal: () => void;
  setPage: Dispatch<SetStateAction<string>>;
};
export const Menu_section: React.FunctionComponent<MenuSectionProps> = ({
  ifTimeline,
  openModal,
  setPage,
}) => {
  const [showMenu, setShowMenu] = useState(true);

  let lastScrollY = 0;

  const { userPic } = useUserProfileImage();

  const controlMenu = () => {
    // スクロールが下向きの場合、メニューを隠す
    setShowMenu(!(window.scrollY > lastScrollY));
    lastScrollY = window.scrollY; // 現在のスクロール位置を保存
  };
  const bottomScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight)
      setShowMenu(false);
  };

  useEffect(() => {
    if (ifTimeline) {
      window.addEventListener("scroll", controlMenu);
      window.addEventListener("scroll", bottomScroll);
    }
    return () => {
      window.removeEventListener("scroll", controlMenu);
      window.removeEventListener("scroll", bottomScroll);
    };
  }, []);

  if (!userPic) {
    return (
      <div className={"hidden"}>
        <CircularProgress />
      </div>
    );
  }

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "100%" }, // メニューを上にスライドさせて隠す
  };

  return (
    <nav>
      <motion.div
        className="md:hidden bg-white"
        variants={variants}
        animate={showMenu ? "open" : "closed"}
        initial="closed"
        transition={{ duration: 0.5 }}
      >
        <div className={`md:hidden bg-white`}>
          <ul className={"flex justify-between pt-3 px-4 shadow"}>
            <Menu
              key={"home_menu"}
              isActive={true}
              title={"Home"}
              pageName={"home"}
              setPage={setPage}
              userPic={false}
              icon={faHouse}
              openModal={false}
              mobile={true}
            />
            <Menu
              key={"search_menu"}
              isActive={true}
              title={"Search"}
              pageName={"search"}
              setPage={setPage}
              userPic={false}
              icon={faMagnifyingGlass}
              openModal={false}
              mobile={true}
            />
            <Menu
              key={"notification_menu"}
              isActive={false}
              title={"Notification"}
              pageName={"notification"}
              setPage={setPage}
              userPic={false}
              icon={faBell}
              openModal={false}
              mobile={true}
            />
            <Menu
              key={"post_menu"}
              title={"Post"}
              isActive={true}
              icon={faSquarePlus}
              pageName={""}
              setPage={setPage}
              userPic={false}
              openModal={openModal}
              mobile={true}
            />
            <Menu
              key={"profile_menu"}
              isActive={false}
              title={"Profile"}
              pageName={"profile"}
              setPage={setPage}
              icon={false}
              userPic={userPic}
              openModal={false}
              mobile={true}
            />
            <Menu
              key={"settings_menu"}
              isActive={true}
              title={"Settings"}
              pageName={"settings"}
              setPage={setPage}
              userPic={false}
              icon={faGear}
              openModal={false}
              mobile={true}
            />
          </ul>
        </div>
      </motion.div>
      <div className={"hidden md:flex flex-col pt-4"}>
        <Logo />
        <ul>
          <Menu
            key={"home_menu"}
            isActive={true}
            title={"Home"}
            pageName={"home"}
            setPage={setPage}
            icon={faHouse}
            userPic={false}
            openModal={false}
            mobile={false}
          />
          <Menu
            key={"search_menu"}
            isActive={true}
            title={"Search"}
            pageName={"search"}
            setPage={setPage}
            icon={faMagnifyingGlass}
            userPic={false}
            openModal={false}
            mobile={false}
          />
          <Menu
            key={"notification_menu"}
            isActive={false}
            title={"Notification"}
            pageName={"notification"}
            setPage={setPage}
            icon={faBell}
            userPic={false}
            openModal={false}
            mobile={false}
          />
          <Menu
            key={"post_menu"}
            title={"Post"}
            isActive={true}
            icon={faSquarePlus}
            pageName={""}
            setPage={setPage}
            openModal={openModal}
            userPic={false}
            mobile={false}
          />
          <Menu
            key={"profile_menu"}
            isActive={false}
            title={"Profile"}
            pageName={"profile"}
            setPage={setPage}
            icon={false}
            userPic={userPic}
            openModal={false}
            mobile={false}
          />
          <Menu
            key={"settings_menu"}
            isActive={true}
            title={"Settings"}
            pageName={"settings"}
            setPage={setPage}
            icon={faGear}
            userPic={false}
            openModal={false}
            mobile={false}
          />
        </ul>
      </div>
    </nav>
  );
};

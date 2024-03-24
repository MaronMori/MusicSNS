import { Logo } from "@/app/components/logo/logo";
import { Menu } from "@/app/components/main_page_sections_/menu_section/components/menu";
import {
  faBell,
  faGear,
  faHouse,
  faMagnifyingGlass,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useUserProfileInfo } from "@/app/components/provider/user_profile_info_provider";
import { CircularProgress } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type MenuSectionProps = {
  openModal: () => void;
  setPage: Dispatch<SetStateAction<string>>;
};
export const Menu_section: React.FunctionComponent<MenuSectionProps> = ({
  openModal,
  setPage,
}) => {
  const { userProfileInfo } = useUserProfileInfo();

  if (!userProfileInfo) {
    return (
      <div className={"hidden"}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <nav className={"h-full"}>
      <div className={`md:hidden bg-white h-15 shadow`}>
        <ul className={"flex justify-between pt-3 px-4"}>
          <Menu
            key={"home_menu"}
            isActive={true}
            title={"Home"}
            pageName={"home"}
            setPage={setPage}
            userProfileInfo={false}
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
            userProfileInfo={false}
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
            userProfileInfo={false}
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
            userProfileInfo={false}
            openModal={openModal}
            mobile={true}
          />
          <Menu
            key={"profile_menu"}
            isActive={true}
            title={"Profile"}
            pageName={"profile"}
            setPage={setPage}
            icon={false}
            userProfileInfo={userProfileInfo}
            openModal={false}
            mobile={true}
          />
          <Menu
            key={"settings_menu"}
            isActive={true}
            title={"Settings"}
            pageName={"settings"}
            setPage={setPage}
            userProfileInfo={false}
            icon={faGear}
            openModal={false}
            mobile={true}
          />
        </ul>
      </div>
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
            userProfileInfo={false}
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
            userProfileInfo={false}
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
            userProfileInfo={false}
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
            userProfileInfo={false}
            mobile={false}
          />
          <Menu
            key={"profile_menu"}
            isActive={true}
            title={"Profile"}
            pageName={"profile"}
            setPage={setPage}
            icon={false}
            userProfileInfo={userProfileInfo}
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
            userProfileInfo={false}
            openModal={false}
            mobile={false}
          />
        </ul>
      </div>
    </nav>
  );
};

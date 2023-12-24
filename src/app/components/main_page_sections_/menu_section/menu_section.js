import {Logo} from "@/app/components/logo/logo";
import {Menu} from "@/app/components/main_page_sections_/menu_section/components/menu";
import {faBell, faGear, faHouse, faMagnifyingGlass, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "@/app/components/provider/auth_provider";
import {collection, doc, getDoc} from "firebase/firestore";
import {firestore} from "../../../../../lib/FirebaseConfig";
import {useEffect, useState} from "react";
import {useUserProfileImage} from "@/app/components/provider/user_profile_image";

export const Menu_section = ({openModal}) => {

    const userPic = useUserProfileImage();
    if (!userPic) {
        return <div>Loading...</div>;
    }
    console.log("user picture is" + userPic)

    return(
        <nav className="mt-6 ml-6">
            <Logo />
            <ul>
                <Menu key={"home_menu"} title={"Home"} page={"/"} icon={faHouse}/>
                <Menu key={"search_menu"} title={"Search"} page={"search"} icon={faMagnifyingGlass}/>
                <Menu key={"notification_menu"} title={"Notification"} page={"/"} icon={faBell}/>
                <Menu key={"post_menu"} title={"Post"} icon={faSquarePlus} openModal={openModal}/>
                <Menu key={"profile_menu"} title={"Profile"} page={"/"} userPic={userPic}/>
                <Menu key={"settings_menu"} title={"Settings"} page={"/settings"} icon={faGear}/>
            </ul>
        </nav>
    )
}
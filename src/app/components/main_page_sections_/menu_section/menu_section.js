"use client"

import {Logo} from "@/app/components/logo/logo";
import {Menu} from "@/app/components/main_page_sections_/menu_section/components/menu";
import {faBell, faGear, faHouse, faMagnifyingGlass, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import {useUserProfileImage} from "@/app/components/provider/user_profile_image";
import {CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {motion} from "framer-motion"

export const Menu_section = ({openModal}) => {
    const [showMenu, setShowMenu] = useState(true);
    let lastScrollY = 0;

    const userPic = useUserProfileImage();

    const controlMenu = () => {
        // スクロールが下向きの場合、メニューを隠す
        setShowMenu(!(window.scrollY > lastScrollY));
        lastScrollY = window.scrollY; // 現在のスクロール位置を保存
    };
    const bottomScroll = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight)
            setShowMenu(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", controlMenu);
        window.addEventListener("scroll", bottomScroll);

        return () =>
            window.removeEventListener("scroll", controlMenu, bottomScroll)
            window.removeEventListener('scroll', controlMenu)
    }, []);

    if (!userPic) {
        return(
            <div className={"hidden"}>
                    <CircularProgress />
            </div>
            )

    }

    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "100%" } // メニューを上にスライドさせて隠す
    };

    return(
        <nav className="">
            <motion.div
                className="md:hidden bg-white"
                variants={variants}
                animate={showMenu ? "open" : "closed"}
                initial="closed"
                transition={{ duration: 0.5 }}
            >
            <div className={`md:hidden bg-white`}>
                <ul className={"flex justify-between pt-3 px-4 shadow"}>
                    <Menu key={"home_menu"} isActive={true} title={"Home"} page={"/"} icon={faHouse} mobile={true}/>
                    <Menu key={"search_menu"} isActive={true} title={"Search"} page={"search"} icon={faMagnifyingGlass} mobile={true}/>
                    <Menu key={"notification_menu"} isActive={false} title={"Notification"} page={""} icon={faBell} mobile={true}/>
                    <Menu key={"post_menu"} title={"Post"} isActive={true} icon={faSquarePlus} openModal={openModal} mobile={true}/>
                    <Menu key={"profile_menu"} isActive={false} title={"Profile"} page={""} userPic={userPic} mobile={true}/>
                    <Menu key={"settings_menu"} isActive={true} title={"Settings"} page={"/settings"} icon={faGear} mobile={true}/>
                </ul>
            </div>
            </motion.div>
            <div className={"hidden md:flex flex-col pt-4"}>
                <Logo />
                <ul>
                    <Menu key={"home_menu"} isActive={true} title={"Home"} page={"/"} icon={faHouse}/>
                    <Menu key={"search_menu"} isActive={true} title={"Search"} page={"search"} icon={faMagnifyingGlass}/>
                    <Menu key={"notification_menu"} isActive={false} title={"Notification"} page={""} icon={faBell}/>
                    <Menu key={"post_menu"} title={"Post"} isActive={true} icon={faSquarePlus} openModal={openModal}/>
                    <Menu key={"profile_menu"} isActive={false} title={"Profile"} page={""} userPic={userPic}/>
                    <Menu key={"settings_menu"} isActive={true} title={"Settings"} page={"/settings"} icon={faGear}/>
                </ul>
            </div>
        </nav>
    )
}
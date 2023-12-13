import {Logo} from "@/app/components/logo/logo";

export const Menu = () => {
    return(
        <nav className="container grid grid-rows-6">
                <Logo />
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Search</a></li>
                <li><a href="">Notification</a></li>
                <li><a href="">Post</a></li>
                <li><a href="">Profile</a></li>
                <li><a href="">Settings</a></li>
            </ul>
        </nav>
    )
}
"use client"

import {signOut} from "firebase/auth"
import {auth} from "../../../../lib/FirebaseConfig";
import SpotifyLogin from "./spotifyLogin";
import {Button} from "@mui/material";

export const Settings_section = () => {

    const logout = async () => {
        try {
            await signOut(auth);
            alert("You are now logged out.")
        }catch (error){
            alert("You couldn't logged out.")
        }
    }

    return(
        <div className={"h-screen text-center"}>
            <div className={"flex flex-col justify-center space-y-8 mx-6 pt-24"}>
                <Button type={"button"} color={"warning"} variant={"contained"} onClick={logout} className={"mt-32 py-2 px-4"}>Logout</Button>
                <SpotifyLogin/>
            </div>
        </div>
    )
}
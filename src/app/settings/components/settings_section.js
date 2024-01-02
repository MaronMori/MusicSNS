"use client"

import {signOut} from "firebase/auth"
import {auth} from "../../../../lib/FirebaseConfig";

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
            <button onClick={logout} className={"mt-32 py-2 px-4 border border-black rounded-3xl"}>Logout</button>
        </div>
    )
}
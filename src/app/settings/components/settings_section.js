import {useAuth} from "@/app/components/provider/auth_provider";
import {getAuth, signOut} from "firebase/auth"

export const Settings_section = () => {
    const auth = getAuth()

    const logout = async () => {
        try {
            await signOut(auth);
            alert("You are now logged out.")
        }catch (error){
            alert("You couldn't logged out.")
        }
    }

    return(
        <div className={"text-center mt-8"}>
            <button onClick={logout} className={"mt-32 py-2 px-4 border border-black rounded-3xl"}>Logout</button>
        </div>
    )
}
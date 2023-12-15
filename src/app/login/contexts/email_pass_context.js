import {useContext, useState} from "react";
import {createContext} from "react";

export const Email_pass_context = createContext();


export const Email_pass_provider = ({children}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const value = {
        email,
        setEmail,
        password,
        setPassword
    }

    return(
        <Email_pass_context.Provider value={value}>
            {children}
        </Email_pass_context.Provider>
        )
}
export const useEmailPass = () => {useContext(Email_pass_context)}
"use client"

import {createContext, useContext, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useRouter} from "next/navigation";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // this useEffect is used to get current user information. onAuthStateChange function listen user
    // authentication information
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }else {
                alert("You are not logged in. Please login to continue.");
                router.push("/register")
            }
        });

        return () => unsubscribe(); // cleanup function
    }, []);

    const value = {user};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
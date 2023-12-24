"use client"

import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "@/app/components/provider/auth_provider";
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../../../../lib/FirebaseConfig";

const userProfileImageContext = createContext({ userPic: null });

export const UserProfileImageProvider = ({children}) => {
    const [userPic, setUserPic ] = useState(null);
    const { user } = useAuth();
    useEffect(() => {

        console.log("Current user is " + user)
        const fetchUserInfo = async () => {
            if (user?.uid){
                try {
                    const userDoc = await getDoc(doc(firestore, "users", user.uid));
                    setUserPic(userDoc.data().profileImageUrl)
                }catch (error){
                    console.error("Error fetching user data:", error);
                }
            }
        }
        fetchUserInfo();
    }, [user]);

    const value = userPic

    return (
        <userProfileImageContext.Provider value={value}>
            {children}
        </userProfileImageContext.Provider>
    )
}

export const useUserProfileImage = () => useContext(userProfileImageContext);
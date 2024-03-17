"use client";

import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/app/components/provider/auth_provider";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../lib/FirebaseConfig";

interface Context {
  userPic: string;
  setUserPic: Dispatch<string>;
}
const userProfileImageContext = createContext<Context>({
  userPic: "",
  setUserPic: () => {},
});

export const UserProfileImageProvider = ({ children }) => {
  const [userPic, setUserPic] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          setUserPic(userDoc.data().profileImageUrl);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserInfo();
  }, [user]);

  const value = { userPic, setUserPic };

  return (
    <userProfileImageContext.Provider value={value}>
      {children}
    </userProfileImageContext.Provider>
  );
};

export const useUserProfileImage = () => useContext(userProfileImageContext);

"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/app/components/provider/auth_provider";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../lib/FirebaseConfig";

interface Context {
  userProfileInfo: {
    bio: string;
    profileImageUrl: string;
    userID: string;
    username: string;
  };
  setUserProfileInfo: Dispatch<SetStateAction<object>>;
}

const defaultValue = {
  bio: "",
  profileImageUrl: "",
  userID: "",
  username: "",
};
const userProfileInfoContext = createContext<Context>({
  userProfileInfo: defaultValue,
  setUserProfileInfo: () => {},
});

export const UserProfileInfoProvider = ({ children }) => {
  const [userProfileInfo, setUserProfileInfo] = useState(defaultValue);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          const data = userDoc.data() as {
            bio: string;
            profileImageUrl: string;
            userID: string;
            username: string;
          };
          setUserProfileInfo(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserInfo();
  }, [user]);

  const value = { userProfileInfo, setUserProfileInfo };

  return (
    <userProfileInfoContext.Provider value={value}>
      {children}
    </userProfileInfoContext.Provider>
  );
};

export const useUserProfileInfo = () => useContext(userProfileInfoContext);

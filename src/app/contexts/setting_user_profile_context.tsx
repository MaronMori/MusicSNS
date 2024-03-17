import { createContext, useContext, useState } from "react";

export const Setting_user_profile_context = createContext();

export const Setting_user_profile_provider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const value = {
    userID,
    setUserID,
    username,
    setUsername,
    bio,
    setBio,
    image,
    setImage,
  };

  return (
    <Setting_user_profile_context.Provider value={value}>
      {children}
    </Setting_user_profile_context.Provider>
  );
};
export const useSetting_user_profile_context = () =>
  useContext(Setting_user_profile_context);

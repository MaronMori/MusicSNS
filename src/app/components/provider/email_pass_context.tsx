import React, { useContext, useState } from "react";
import { createContext } from "react";

interface Props {
  email: string;
  setEmail: React.Dispatch<string>;
  password: string;
  setPassword: React.Dispatch<string>;
}

export const Email_pass_context = createContext<Props>({
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
});

export const Email_pass_provider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const value = {
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <Email_pass_context.Provider value={value}>
      {children}
    </Email_pass_context.Provider>
  );
};
export const useEmailPass = () => useContext(Email_pass_context);

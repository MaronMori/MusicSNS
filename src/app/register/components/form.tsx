import { Form_email } from "@/app/components/tools/form_email";
import { Form_password } from "@/app/components/tools/form_password";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useEmailPass } from "@/app/contexts/email_pass_context";
import { Submit_button_to_form } from "@/app/components/tools/submit_button_to_form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { LinearProgress } from "@mui/material";

export const RegisterForm = () => {
  const { email, password } = useEmailPass();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const doRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // login automatically and get user info when registering completed
        userCredential.user;
        alert("Success Log In!");
        router.push("/setting_user_profile");
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const goToLoginPage = () => {
    router.push("/login");
  };

  return (
    <div className={"h-screen"}>
      <div className="mt-32 md:mt-52 flex justify-center items-center text-center">
        <form
          className="w-full max-w-md border border-black p-4"
          onSubmit={doRegister}
        >
          <h1 className="mb-6 text-2xl">Create Account</h1>
          <Form_email />
          <Form_password />
          <Submit_button_to_form text={"Register"} />
          {isLoading && <LinearProgress className={"mt-3"} />}
        </form>
      </div>
      <div className={"text-center mx-2"}>
        <p className={"my-2"}>
          You have an account already? Then, Please go to Login Page.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="border border-black px-2 py-1  rounded w-24 h-12"
          onClick={goToLoginPage}
        >
          Login
        </motion.button>
        <p>
          If you want to use test account instead of creating new account, you
          can use this account to login.
        </p>
        <p>新規ユーザー登録の代わりに下の仮アカウントでログインできます。</p>
        <div className={"flex justify-center"}>
          <div className={"border border-black mt-2 p-4 "}>
            <p>Email: q80jdo8rc9@sute.jp</p>
            <p>Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

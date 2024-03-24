"use client";

import { auth } from "../../../../lib/FirebaseConfig.js";
import { Form_email } from "@/app/components/tools/form_email";
import { Form_password } from "@/app/components/tools/form_password";
import { Submit_button_to_form } from "@/app/components/tools/submit_button_to_form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEmailPass } from "@/app/components/provider/email_pass_context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, LinearProgress, Paper } from "@mui/material";
import Link from "next/link";
import { Tentative_account } from "@/app/components/tools/tentative_account";

export const LoginForm = () => {
  const { email, password } = useEmailPass();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const doLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userCredential.user;
        alert("Success Log In!");
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        if (error.message.includes("auth/invalid-credential")) {
          alert(
            "Please enter correct email and/or password.\nメールアドレスもしくはパスワードが間違っています。",
          );
        } else if (error.message.includes("too-many")) {
          alert(
            "Too many attempts. you can try again later.\n多数のリクエストのため少し時間を置いてからログインしてください。",
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className={"flex items-center min-h-screen "}>
      <Paper
        className={"md:w-1/2 w-11/12"}
        elevation={5}
        sx={{ marginX: "auto", marginY: 0 }}
      >
        <div className={"overflow-auto max-h-dvh p-4"}>
          <div className={"flex justify-center text-center"}>
            <form className="w-full max-w-md" onSubmit={doLogin}>
              <h1 className="mb-5 text-2xl">LOGIN</h1>
              <Form_email />
              <Form_password />
              <Submit_button_to_form text={"Login"} />
              {isLoading && <LinearProgress className={"mt-3"} />}
            </form>
          </div>
          <div className={"flex justify-center mt-2"}>
            <hr className={"w-5/6"} />
          </div>
          <Tentative_account />
          <div className={"flex justify-center w-full mt-2"}>
            <Link href={"/register"} className={"w-full"}>
              <Button
                size={"large"}
                fullWidth={true}
                variant={"contained"}
                color={"success"}
                type={"button"}
              >
                Create Acccount
              </Button>
            </Link>
          </div>
        </div>
      </Paper>
    </div>
  );
};

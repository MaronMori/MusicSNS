"use client";
import { auth } from "../../../../lib/FirebaseConfig";
import { Form_email } from "@/app/components/tools/form_email";
import { Form_password } from "@/app/components/tools/form_password";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEmailPass } from "@/app/components/provider/email_pass_context";
import { Submit_button_to_form } from "@/app/components/tools/submit_button_to_form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, LinearProgress, Paper } from "@mui/material";
import Link from "next/link";
import { Tentative_account } from "@/app/components/tools/tentative_account";

export const RegisterForm = () => {
  const { email, password } = useEmailPass();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const doRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // login automatically and get user info when registering completed
        userCredential.user;
        alert("Success Log In!");
        router.push("/setting_user_profile");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.message.includes("email-already-in-use")) {
          alert("メールアドレスはすでに使われています。");
        } else {
          alert("有効なメールアドレスとパスワードを入力してください。");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={"flex items-center min-h-screen "}>
      <Paper
        elevation={5}
        className={"md:w-1/2 w-11/12"}
        sx={{ marginX: "auto", marginY: 0 }}
      >
        <div className={"overflow-auto max-h-dvh py-4"}>
          <div className="flex justify-center text-center">
            <form className="w-full max-w-md p-4" onSubmit={doRegister}>
              <h1 className="mb-6 text-2xl">CREATE ACCOUNT</h1>
              <Form_email />
              <Form_password />
              <Submit_button_to_form text={"Register"} />
              {isLoading && <LinearProgress className={"mt-3"} />}
            </form>
          </div>
          <div className={"flex justify-center"}>
            <div className={"text-center"}>
              <div className={"flex justify-center"}>
                <hr className={"w-5/6"} />
              </div>
              <p className={"my-2"}>
                If you have your account, you can login on Login Page.
              </p>
              <p>ログインページは下のボタンから</p>
              <div className={"mb-2 w-full"}>
                <Link href={"/login"} className={"w-full"}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    type={"button"}
                    color={"success"}
                    fullWidth={true}
                  >
                    LOGIN
                  </Button>
                </Link>
              </div>
              <div className={"flex justify-center mb-2"}>
                <hr className={"w-5/6"} />
              </div>
              <Tentative_account />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

"use client";

import { LoginForm } from "@/app/login/components/form";
import { Email_pass_provider } from "@/app/contexts/email_pass_context";
// import firebaseApp to initialize Firebase
import firebaseApp from "../../../lib/FirebaseConfig";

export default function Login() {
  return (
    <Email_pass_provider>
      <LoginForm />
    </Email_pass_provider>
  );
}

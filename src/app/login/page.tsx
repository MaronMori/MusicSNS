"use client";

import { LoginForm } from "@/app/login/components/form";
import { Email_pass_provider } from "@/app/components/provider/email_pass_context";

export default function Login() {
  return (
    <Email_pass_provider>
      <LoginForm />
    </Email_pass_provider>
  );
}

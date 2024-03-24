"use client";

import { RegisterForm } from "@/app/register/components/form";
import { Email_pass_provider } from "@/app/components/provider/email_pass_context";

export default function Page() {
  return (
    <Email_pass_provider>
      <RegisterForm />
    </Email_pass_provider>
  );
}

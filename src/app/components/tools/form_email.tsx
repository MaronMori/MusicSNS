import { useEmailPass } from "@/app/contexts/email_pass_context";

export const Form_email = () => {
  const { setEmail } = useEmailPass();
  return (
    <div className="flex justify-between items-center mb-4">
      <label className="mx-4">Email Address</label>
      <input
        type="email"
        name="email"
        className="border border-black mx-4 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

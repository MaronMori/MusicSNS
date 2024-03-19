import { useEmailPass } from "@/app/contexts/email_pass_context";
import { FormControl, TextField } from "@mui/material";

export const Form_email = () => {
  const { setEmail } = useEmailPass();
  return (
    <FormControl margin={"dense"} fullWidth={true}>
      <TextField
        required={true}
        type="email"
        label="Email Address"
        size={"small"}
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>
  );
};

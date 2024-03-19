import { useEmailPass } from "@/app/contexts/email_pass_context";
import { FormControl, TextField } from "@mui/material";

export const Form_password = () => {
  const { setPassword } = useEmailPass();
  return (
    <FormControl margin={"dense"} fullWidth={true}>
      <TextField
        required={true}
        type="password"
        label="Password"
        size="small"
        onChange={(e) => setPassword(e.target.value)}
      />
    </FormControl>
  );
};

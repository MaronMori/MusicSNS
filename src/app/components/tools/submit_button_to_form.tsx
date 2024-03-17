import { Button } from "@mui/material";

export const Submit_button_to_form = ({ text }) => {
  return (
    <div>
      <Button type={"submit"}>{text}</Button>
    </div>
  );
};

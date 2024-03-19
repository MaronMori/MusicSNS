import { Button } from "@mui/material";

export const Submit_button_to_form = ({ text }) => {
  return (
    <div className={"w-full"}>
      <Button
        variant={"contained"}
        type={"submit"}
        size={"large"}
        fullWidth={true}
      >
        {text}
      </Button>
    </div>
  );
};

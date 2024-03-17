import { CircularProgress } from "@mui/material";

export const LoadingPage = ({ text }) => {
  return (
    <div className="py-6 flex justify-center h-screen">
      <div className={"flex justify-center"}>
        <div className={"flex flex-col justify-center text-center"}>
          <h1>{text}</h1>
          <div className={"flex justify-center pt-4"}>
            <CircularProgress size={66} />
          </div>
        </div>
      </div>
    </div>
  );
};

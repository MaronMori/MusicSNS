import { CircularProgress } from "@mui/material";
import { yellow } from "@mui/material/colors";

export const Post_song_button = ({ uploadingSong }) => {
  const buttonClass = `mt-2 border border-black rounded-2xl icon-button py-1 px-2 ${uploadingSong ? "disabled" : ""}`;

  return (
    <div>
      <button className={buttonClass} disabled={uploadingSong} type={"submit"}>
        Post
      </button>
      {uploadingSong && (
        <CircularProgress
          size={48}
          sx={{
            color: yellow[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </div>
  );
};

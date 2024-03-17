import { CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";

export const Post_button = ({ uploading }) => {
  const buttonClass = `mt-2 border border-black rounded-2xl icon-button py-1 px-2 ${uploading ? "disabled" : ""}`;

  return (
    <div>
      <button className={buttonClass} disabled={uploading} type={"submit"}>
        Post
      </button>
      {uploading && (
        <CircularProgress
          size={48}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
      <style jsx>
        {`
          .icon-button {
            transition: transform 0.2s ease;
          }

          .icon-button:hover {
            transform: scale(1.1);
          }
          .disabled {
            background-color: #cccccc; // 灰色の背景
            color: #666666; // 暗めの文字色
            border-color: #cccccc; // ボーダーも灰色に
            cursor: not-allowed; // カーソルを変更
          }
        `}
      </style>
    </div>
  );
};

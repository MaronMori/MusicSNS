import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../../lib/FirebaseConfig";
import { useAuth } from "@/app/components/provider/auth_provider";

export const Post_music_header = ({
  renewUserSongs,
  setRenewUserSongs,
  onBack,
  songSelectPage,
  setSongSelectPage,
  songPostPage,
}) => {
  const { user: userAuth } = useAuth();

  const handleRenewSongs = async (e) => {
    e.preventDefault();
    setRenewUserSongs(true);

    const currentTime = new Date().getTime();
    const expireTime = parseInt(sessionStorage.getItem("tokenExpireTime"), 10);

    if (currentTime > expireTime) {
      const refreshToken = sessionStorage.getItem("spotifyRefreshToken");
      try {
        const response = await fetch("api/spotifyAPI", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response) {
          alert("リフレッシュトークンでの曲の再取得でエラーが起きました。");
        }
        const data = await response.json();
        // トークンと現在の時刻＋有効期限を保存
        sessionStorage.setItem("spotifyAccessToken", data.accessToken);
        sessionStorage.setItem("spotifyRefreshToken", data.refreshToken);
        sessionStorage.setItem("tokenExpireTime", expireTime.toString());
        try {
          await updateDoc(doc(firestore, "users", userAuth.uid), {
            Songs: data.userSongs,
            NextURL: data.nextURL,
          });
        } catch (e) {
          console.log("Error uploading songs to firebase: ", e);
          alert(e.message);
        }
      } catch (error) {
        alert("トークンを再取得のリクエストの際にエラーが起きました。" + error);
      }
    } else {
      // トークンがまだ有効な場合の処理
      const accessToken = sessionStorage.getItem("spotifyAccessToken");
      try {
        const response = await fetch("api/spotifyAPI", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken }),
        });

        if (!response) {
          alert("曲の再取得でエラーが起きました。");
        }
        const data = await response.json();

        try {
          await updateDoc(doc(firestore, "users", userAuth.uid), {
            Songs: data.userSongs,
            NextURL: data.nextURL,
          });
        } catch (e) {
          console.log("Error uploading songs to firebase: ", e);
          alert(e.message);
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }

    setRenewUserSongs(false);
  };

  if (songPostPage) {
    return (
      <div className={"border-b-2 border-black pb-2"}>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  if (songSelectPage) {
    return (
      <div className={"border-b-2 border-black flex justify-between pb-2"}>
        <button type={"button"} onClick={onBack}>
          Back
        </button>
        <ButtonGroup>
          <Button
            color={"success"}
            disabled={!songSelectPage}
            onClick={() => setSongSelectPage(!songSelectPage)}
          >
            Your Song
          </Button>
          <Button
            color={"success"}
            disabled={songSelectPage}
            onClick={() => setSongSelectPage(!songSelectPage)}
          >
            Search
          </Button>
        </ButtonGroup>
        <div className="opacity-0">Back</div>
      </div>
    );
  }

  return (
    <div className={"border-b-2 border-black flex justify-between pb-2"}>
      <button type={"button"} onClick={onBack}>
        Back
      </button>
      <div>
        <ButtonGroup>
          <Button
            color={"success"}
            disabled={!songSelectPage}
            onClick={() => setSongSelectPage(!songSelectPage)}
          >
            Your Song
          </Button>
          <Button
            color={"success"}
            disabled={songSelectPage}
            onClick={() => setSongSelectPage(!songSelectPage)}
          >
            Search
          </Button>
        </ButtonGroup>
      </div>
      {!songSelectPage ? (
        !renewUserSongs ? (
          <Button type={"button"} onClick={(e) => handleRenewSongs(e)}>
            <AutorenewIcon />
          </Button>
        ) : (
          <CircularProgress />
        )
      ) : (
        <div className="opacity-0">Back</div>
      )}
      {/* 透明なスペーサー */}
    </div>
  );
};

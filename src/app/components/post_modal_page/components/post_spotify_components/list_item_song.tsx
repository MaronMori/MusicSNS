import { motion } from "framer-motion";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

export const List_item_song = ({
  previewUrl,
  isPlaying,
  setIsPlaying,
  audioRef,
  song,
  setSongPost,
  setTrackInfoForPost,
  togglePlay,
}) => {
  const hoverAnimation = {
    backgroundColor: "#CCFFFF",
  };
  const transition = {
    type: "tween", // トランジションの種類
    duration: 0.2, // トランジションの時間
  };

  useEffect(() => {
    return () => {
      setIsPlaying(false);
    };
  }, []);

  const songSelected = (event) => {
    event.preventDefault();
    // 流れている曲を停止
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    // searchから曲を選んだ場合、オブジェクトの階層をuser's songと同じにする
    if (song.album) {
      setTrackInfoForPost({ track: song });
    } else {
      setTrackInfoForPost(song);
    }
    setSongPost(true);
  };

  // search result song
  if (song.album) {
    return (
      <div className={"w-full border-b-2 flex justify-between"}>
        <div className={"relative"}>
          <Image
            width={120}
            height={120}
            src={song.album.images[0].url}
            alt={"Song Picture"}
          />
          {song.preview_url ? (
            <button
              type={"button"}
              onClick={(event) =>
                togglePlay(song.preview_url, event, song.name)
              }
              className={
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              }
            >
              {isPlaying && previewUrl === song.preview_url ? (
                <PauseCircleIcon
                  color={"success"}
                  style={{ fontSize: "40px" }}
                />
              ) : (
                <PlayCircleIcon
                  color={"success"}
                  style={{ fontSize: "40px" }}
                />
              )}
            </button>
          ) : (
            <CloseIcon
              style={{ fontSize: "40px" }}
              className={
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              }
            />
          )}
        </div>
        <motion.button
          whileHover={hoverAnimation}
          transition={transition}
          type={"button"}
          className={"flex w-full items-center bg-white"}
          onClick={(event) => songSelected(event)}
        >
          <div className={"text-left pl-2 flex flex-col justify-center"}>
            <p>{song.artists[0].name}</p>
            <p className={"font-bold"}>{song.name}</p>
          </div>
        </motion.button>
      </div>
    );
  }

  // user's song
  return (
    <div className={"w-full border-b-2 flex justify-between"}>
      <div className={"relative"}>
        <Image
          width={120}
          height={120}
          src={song.track.album.images[0].url}
          alt={"Song Picture"}
        />
        {song.track.preview_url ? (
          <button
            onClick={(event) => togglePlay(song.track.preview_url, event)}
            className={
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            }
          >
            {isPlaying && previewUrl === song.track.preview_url ? (
              <PauseCircleIcon style={{ fontSize: "40px" }} />
            ) : (
              <PlayCircleIcon style={{ fontSize: "40px" }} />
            )}
          </button>
        ) : (
          <CloseIcon
            style={{ fontSize: "40px" }}
            className={
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            }
          />
        )}
      </div>
      <motion.button
        whileHover={hoverAnimation}
        transition={transition}
        className={"flex w-full items-center bg-white"}
        onClick={(event) => songSelected(event)}
      >
        <div className={"text-left pl-2 flex flex-col justify-center"}>
          <p>{song.track.artists[0].name}</p>
          <p className={"font-bold"}>{song.track.name}</p>
        </div>
      </motion.button>
    </div>
  );
};

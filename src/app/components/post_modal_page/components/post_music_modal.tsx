import { Post_music_body } from "@/app/components/post_modal_page/components/post_music_body";
import { Post_music_header } from "@/app/components/post_modal_page/components/post_music_header";
import { FormEvent, useEffect, useRef, useState } from "react";
import { firestore } from "../../../../../lib/FirebaseConfig";
import { Post_music_footer } from "@/app/components/post_modal_page/components/post_music_footer";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { useSpotifyToken } from "@/app/components/provider/spotify_token_provider";
import { List_item_song } from "@/app/components/post_modal_page/components/post_spotify_components/list_item_song";
import { CircularProgress } from "@mui/material";

export const Post_music_modal = ({
  userAuth,
  onClose,
  onBack,
  isPlaying,
  setIsPlaying,
}) => {
  const [textContent, setTextContent] = useState("");
  const [uploadingSong, setUploadingSong] = useState(false);
  const [trackInfoForPost, setTrackInfoForPost] = useState({
    track: undefined,
  });
  const [songSelectPage, setSongSelectPage] = useState(false);
  const [songPostPage, setSongPostPage] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResultSong, setSearchResultSong] = useState([]);
  const [searching, setSearching] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [renewUserSongs, setRenewUserSongs] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { spotifyToken } = useSpotifyToken();

  const router = useRouter();

  useEffect(() => {
    // 曲を選択した状態の投稿画面で使用
    if (trackInfoForPost.track && trackInfoForPost.track.preview_url) {
      audioRef.current = new Audio(trackInfoForPost.track.preview_url);
    }
    // 曲のリスト表示の時の曲の再生
    else if (previewUrl) {
      audioRef.current = new Audio(previewUrl);
      setIsPlaying(true);
    }
  }, [trackInfoForPost.track, previewUrl]);

  useEffect(() => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }
  }, [isPlaying]);

  const submitSongPost = async (userId, songData) => {
    try {
      await addDoc(collection(firestore, "posts"), {
        userId: userId,
        songData: songData,
        text: textContent,
        create: serverTimestamp(),
      });
      alert("Uploaded!");
      return true;
    } catch (error) {
      console.error("Failed Posting: ", error);
      alert("Failed Posting");
      return false;
    }
  };

  const handleSubmitSongPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadingSong(true);

    const userId = userAuth.uid;

    if (await submitSongPost(userId, trackInfoForPost)) {
      setTextContent("");
      setTrackInfoForPost({
        track: undefined,
      });
      setUploadingSong(false);

      onClose();
      router.push("/");
    } else {
      setUploadingSong(false);
    }
  };

  // get song by search using server api
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue) return; // クエリが空の場合は何もしない
    setSearching(true);

    try {
      const response = await fetch("/api/search_spotify_song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchValue, spotifyToken }),
      });

      if (!response.ok) {
        alert("Search failed");
      }

      const { tracks } = await response.json();
      setSearchResultSong(tracks);
    } catch (error) {
      console.error("Error during search:", error);
    }
    setSearching(false);
  };

  const togglePlay = async (preview_url = undefined, event = undefined) => {
    event.preventDefault();
    await setIsPlaying(false);
    if (preview_url && !isPlaying) {
      await setPreviewUrl(preview_url);
      await setIsPlaying(!isPlaying);
    } else if (preview_url && preview_url !== previewUrl) {
      await setPreviewUrl(preview_url);
    } else {
      await setIsPlaying(!isPlaying);
    }
  };

  // 曲検索モーダル
  if (songSelectPage && !songPostPage) {
    return (
      <form className={"modal p-3"} onSubmit={(e) => handleSearch(e)}>
        <Post_music_header
          onBack={onBack}
          songSelectPage={songSelectPage}
          setSongSelectPage={setSongSelectPage}
          songPostPage={songPostPage}
          renewUserSongs={renewUserSongs}
          setRenewUserSongs={setRenewUserSongs}
        />
        <div className={"w-full flex justify-center"}>
          <div
            className={`px-3 rounded-2xl border flex w-full mx-4 my-3 h-10 ${isFocused ? "border-blue-500" : ""}`}
          >
            <div>
              <SearchIcon className={"mt-1.5"} />
            </div>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={"w-full focus:outline-none"}
              placeholder={"Search track"}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </div>
        {searching && (
          <div className={"text-center py-12"}>
            <CircularProgress />
          </div>
        )}
        {searchResultSong && (
          <div>
            {searchResultSong.map((item, index) => (
              <List_item_song
                key={index}
                previewUrl={previewUrl}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                isPlaying={isPlaying}
                song={item}
                setSongPost={setSongPostPage}
                setTrackInfoForPost={setTrackInfoForPost}
                togglePlay={togglePlay}
              />
            ))}
          </div>
        )}
        <style jsx>
          {`
            .modal {
              background: white;
              border-radius: 8px;
              max-width: 80%;
              max-height: 80%;
              width: 45%;
              height: auto;
              overflow: auto;
            }

            @media (max-width: 600px) {
              .modal {
                max-width: 90%;
                max-height: 60%;
                width: 80%;
              }
            }
          `}
        </style>
      </form>
    );
  }

  return (
    <form className={"modal p-3"} onSubmit={(e) => handleSubmitSongPost(e)}>
      <Post_music_header
        onBack={onBack}
        songSelectPage={songSelectPage}
        setSongSelectPage={setSongSelectPage}
        songPostPage={songPostPage}
        renewUserSongs={renewUserSongs}
        setRenewUserSongs={setRenewUserSongs}
      />
      <Post_music_body
        songPostPage={songPostPage}
        setSongPostPage={setSongPostPage}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setTextContent={setTextContent}
        textContent={textContent}
        trackInfoForPost={trackInfoForPost}
        setTrackInfoForPost={setTrackInfoForPost}
        previewUrl={previewUrl}
        audioRef={audioRef}
        togglePlay={togglePlay}
        renewUserSongs={renewUserSongs}
      />
      {songPostPage && <Post_music_footer uploadingSong={uploadingSong} />}
      <style jsx>
        {`
          .modal {
            background: white;
            border-radius: 8px;
            max-width: 80%;
            max-height: 80%;
            width: 45%;
            height: auto;
            overflow: auto;
          }

          @media (max-width: 600px) {
            .modal {
              max-width: 90%;
              max-height: 60%;
              width: 80%;
            }
          }
        `}
      </style>
    </form>
  );
};

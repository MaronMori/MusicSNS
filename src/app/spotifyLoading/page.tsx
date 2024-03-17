"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SpotifyLoading() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      fetch("/api/spotifyAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // レスポンスがOKならJSONとして解析
          } else {
            throw new Error("Network response was not ok"); // レスポンスがOKでない場合はエラーを投げる
          }
        })
        .then((data) => {
          // router.push("/demo")
          data.userSongs.forEach((item) => {
            console.log(item.track.name);
          });
        });
    }
  }, []);

  return <div>Loading</div>;
}

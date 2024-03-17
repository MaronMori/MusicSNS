import { NextResponse } from "next/server";

async function getUserSongs(accessToken) {
  const url = "https://api.spotify.com/v1/me/tracks";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  return {
    songs: data.items,
    next: data.next,
  };
}
export async function POST(req: Request) {
  const data = await req.json();

  const code = data.code;
  const refreshToken = data.refreshToken;
  const validAccessToken = data.accessToken;

  if (typeof code === "string" && code) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
          ).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      }),
    });
    const data = await response.json();

    if (data.access_token) {
      // トークンを使用してユーザーのデータを取得する処理
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      const expiresIn = data.expires_in;

      // ユーザーのお気に入りの曲リストを取得
      const userData = await getUserSongs(accessToken);
      // send data to frontend
      return NextResponse.json(
        {
          expiresIn: expiresIn,
          userSongs: userData.songs,
          nextURL: userData.next,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        { status: 200 },
      );
    } else {
      // エラーハンドリング
      return NextResponse.json(
        { error: "Authorization failed!" },
        { status: 401 },
      );
    }
  } else if (refreshToken) {
    // リフレッシュトークンをでアクセストークンを再取得して曲を更新
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
          ).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      }),
    });
    const data = await response.json();

    if (data.access_token) {
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      const expiresIn = data.expires_in;

      // ユーザーのお気に入りの曲リストを取得
      const userData = await getUserSongs(accessToken);
      // send data to frontend
      return NextResponse.json(
        {
          expiresIn: expiresIn,
          userSongs: userData.songs,
          nextURL: userData.next,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        { status: 200 },
      );
    } else {
      // エラーハンドリング
      return NextResponse.json(
        { error: "Authorization failed!" },
        { status: 401 },
      );
    }
  } else if (validAccessToken) {
    try {
      const userData = await getUserSongs(validAccessToken);
      return NextResponse.json(
        { userSongs: userData.songs, nextURL: userData.next },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json({ error }, { status: 405 });
    }
  } else {
    // codeがstringでない場合のエラーハンドリング
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

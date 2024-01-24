import {NextApiResponse, NextApiRequest} from "next";
import {NextRequest, NextResponse} from "next/server";
import {getAll} from "@firebase/remote-config";

async function getUserSongs(accessToken) {
  let Songs = [];
  let url = 'https://api.spotify.com/v1/me/tracks';


    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

  return {
    songs: data.items,
    next: data.next
  };
}
export async function POST(req: Request, res: Response) {
  const data = await req.json();

  const code = data.code;

  if (typeof code === "string"){
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      }),
    });
    const data = await response.json();

    if (data.access_token) {
      // トークンを使用してユーザーのデータを取得する処理
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;

      // ユーザーのお気に入りの曲リストを取得
      const userData = await getUserSongs(accessToken);
      // send data to frontend
      return NextResponse.json({userSongs: userData.songs, nextURL: userData.next, accessToken: accessToken, refreshToken: refreshToken}, { status: 200})

    } else {
      // エラーハンドリング
      return NextResponse.json({error: "Authorization failed!"}, {status: 401})
    }
  }
  else {
    // codeがstringでない場合のエラーハンドリング
    return NextResponse.json({error: "Invalid request"}, {status: 400})
  }
}

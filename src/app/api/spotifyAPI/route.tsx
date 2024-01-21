import {NextApiResponse, NextApiRequest} from "next";
import {NextRequest, NextResponse} from "next/server";
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
      console.log(accessToken)

      // ユーザーの最近の曲を取得
      const recentTracksResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
          "Authorization" : `Bearer ${accessToken}`,
        },
      });
      const recentTracks = await recentTracksResponse.json();
      // send data to frontend
      return NextResponse.json({recentTracks: recentTracks}, { status: 200})

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


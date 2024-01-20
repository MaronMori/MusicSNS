import {NextApiResponse, NextApiRequest} from "next";
export async function POST(res: NextApiResponse, req: NextApiRequest) {
  const code = req.query.code;

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

      // ユーザーの最近の曲を取得
      const recentTracksResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
          "Authorization" : `Bearer ${accessToken}`,
        },
      });
      const recentTracks = await recentTracksResponse.json();

      // send data to frontend
      res.status(200).json({recentTracks})
      res.status(200).redirect("/demo")

    } else {
      // エラーハンドリング
      res.status(401).send("Authorization failed!")
    }


  }
  else {
    // codeがstringでない場合のエラーハンドリング
    res.status(400).send('Invalid request');
  }


}


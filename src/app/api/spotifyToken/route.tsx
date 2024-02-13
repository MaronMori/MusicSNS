import {NextResponse} from "next/server";

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
        }),
    });
    const data = await response.json();
    return data.access_token;
}

export async function POST(req: Request, res: Response){
    const accessToken = await getAccessToken()

    if(accessToken) {
        return NextResponse.json({accessToken: accessToken}, {status:200})
    } else {
        return NextResponse.json({error: "Failed to obtain access token"}, {status: 401})
    }
}



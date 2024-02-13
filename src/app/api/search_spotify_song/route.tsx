import {NextRequest, NextResponse} from "next/server";

async function searchSpotifyTracks(searchValue: string, spotifyToken: string) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchValue)}&type=track`, {
        headers: {
            'Authorization': `Bearer ${spotifyToken}`,
        },
    });

    const data = await response.json();
    return data.tracks.items; // 検索結果の曲のリストを返す
}

export async function POST(req: NextRequest){
    const data = await req.json()
    const {searchValue, spotifyToken} = data;

    try {
        const tracks = await searchSpotifyTracks(searchValue, spotifyToken);
        return NextResponse.json({tracks: tracks}, {status: 200})
    }catch (error){
        return NextResponse.json({error: error}, {status: 401})
    }

}
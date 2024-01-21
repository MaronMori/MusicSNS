import React from 'react';
import {Button} from "@mui/material"
import Link from "next/link";

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=02668e84e0414b62b89de191d7f87246&response_type=code&redirect_uri=http://localhost:3000/spotifyLoading&scope=user-read-recently-played%20user-read-private%20user-read-email%20user-library-read"

function SpotifyLogin() {
    return (
        <Button component="a" href={AUTH_URL}>
            Login with Spotify
        </Button>
    );
}

export default SpotifyLogin;
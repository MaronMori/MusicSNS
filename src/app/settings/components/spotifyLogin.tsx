import React from 'react';
import {Button} from "@mui/material"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpotify} from "@fortawesome/free-brands-svg-icons/faSpotify";

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=02668e84e0414b62b89de191d7f87246&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-recently-played%20user-read-private%20user-read-email%20user-library-read%20playlist-read-private"

function SpotifyLogin() {
    return (
        <Button component="a"
                variant={"contained"}
                href={AUTH_URL} sx={{
            backgroundColor: "#001100", // 通常時の背景色
            color: "#00EE00",
            '&:hover': {
                backgroundColor: "#003300", // ホバー時の背景色
            },
            '&:active': {
                backgroundColor: "#005500", // 押下時の背景色
            },
        }}>
            Get Your Saved Songs
            <FontAwesomeIcon icon={faSpotify} className={"ml-2"}/>
        </Button>
    );
}

export default SpotifyLogin;
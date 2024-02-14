"use client"

import {createContext, useContext, useEffect, useState} from "react";

const spotifyTokenContext = createContext({spotifyToken: ""})

export const SpotifyTokenProvider = ({children}) => {
    const [spotifyToken, setSpotifyToken] = useState("");

    useEffect(() => {
        const fetchSpotifyToken = async () => {
            if (!spotifyToken) {
                const response = await fetch('/api/spotifyToken', { method: 'POST' });
                const data = await response.json();
                setSpotifyToken(data.accessToken);
            }
        };

        fetchSpotifyToken();
    }, []);


    const value ={
        spotifyToken,
        setSpotifyToken
    }

    return(
        <spotifyTokenContext.Provider value={value}>
            {children}
        </spotifyTokenContext.Provider>
    )
}

export const useSpotifyToken = () => useContext(spotifyTokenContext)
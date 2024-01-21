"use client"

import React, {useEffect} from 'react';
import {useRouter, useSearchParams} from "next/navigation";


export default function SpotifyLoading() {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        console.log("Effect")
        const code = searchParams.get("code")
        if (code) {
            fetch("/api/spotifyAPI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            })
                .then((response) => {
                    console.log(response + " client")
                    if (response.ok) {
                        return response.json(); // レスポンスがOKならJSONとして解析
                    } else {
                        throw new Error('Network response was not ok'); // レスポンスがOKでない場合はエラーを投げる
                    }
                })
                .then((data) => {
                    router.push("/demo")
                })
        }

    }, []);


    return (
        <div>Loading</div>
    );
}


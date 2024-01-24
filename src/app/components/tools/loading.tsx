import {CircularProgress} from "@mui/material";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {auth} from "../../../../lib/FirebaseConfig";
import {useAuth} from "@/app/components/provider/auth_provider";
import {getApps, initializeApp} from "firebase/app";

export const LoadingPage = ({text}) => {
    return (
        <div className="py-6 flex justify-center h-screen">
            <div className={"flex justify-center"}>
                <div className={"flex flex-col justify-center text-center"}>
                    <h1>{text}</h1>
                    <div className={"flex justify-center pt-4"}>
                        <CircularProgress size={66}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
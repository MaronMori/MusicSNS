"use client"

import {useState} from "react";
import {getFirestore, setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import {firebaseApp,  firestore, storage} from "../../../lib/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {Create_user_profile_form} from "@/app/setting_user_profile/components/create_user_profile_form";
import {Setting_user_profile_provider} from "@/app/contexts/setting_user_profile_context";
import {getAuth} from "firebase/auth";
import {UserProfileImageProvider} from "@/app/components/provider/user_profile_image";
import {AuthProvider} from "@/app/components/provider/auth_provider";

export default function Setting_user_profile(){


    return (
        <AuthProvider>
            <UserProfileImageProvider>
                <Setting_user_profile_provider>
                    <Create_user_profile_form/>
                </Setting_user_profile_provider>
            </UserProfileImageProvider>
        </AuthProvider>
    )
}
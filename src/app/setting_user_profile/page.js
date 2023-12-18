"use client"

import {useState} from "react";
import {getFirestore, setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import {firebaseApp,  firestore, storage} from "../../../lib/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {Form} from "@/app/setting_user_profile/components/form";
import {Setting_user_profile_provider} from "@/app/contexts/setting_user_profile_context";
import {getAuth} from "firebase/auth";

export default function Setting_user_profile(){


    return (
        <Setting_user_profile_provider>
            <Form/>
        </Setting_user_profile_provider>
    )
}
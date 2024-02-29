"use client";

import {AuthProvider} from "../components/provider/auth_provider"
import {UserProfileImageProvider} from "../components/provider/user_profile_image";

export function Providers({children}){
    return (
        <AuthProvider>
            <UserProfileImageProvider>
                {children}
            </UserProfileImageProvider>
        </AuthProvider>
    )
}
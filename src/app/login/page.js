"use client"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";


// to initialize firebase
import firebaseApp from "../../../lib/FirebaseConfig"
import {error} from "next/dist/build/output/log";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const doLogin = (e) => {
        e.preventDefault();

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // if login is succeeded, alert ok
                alert("Success Log In!");
                console.log( user );
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            })
    }
    return (
        <div className="min-h-screen flex justify-center items-center text-center">
            <form className="w-full max-w-md border border-black p-4" onSubmit={doLogin}>
                <h1 className="mb-6 text-2xl">Login</h1>
                <div className="flex justify-between items-center mb-4">
                    <label className="mx-4">
                        Email Address
                    </label>
                    <input type="email" name="email" className="border border-black mx-4 rounded" onChange={(e)=> setEmail((e.target.value))}/>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <label className="mx-4">
                        Password
                    </label>
                    <input type="password" name="password" className="border border-black mx-4 rounded" onChange={(e)=> setPassword((e.target.value))}/>
                </div>
                <div>
                    <button className="border border-black px-2 py-1 rounded-2xl" type="submit">Sign In</button>
                </div>
            </form>
        </div>
    )
}